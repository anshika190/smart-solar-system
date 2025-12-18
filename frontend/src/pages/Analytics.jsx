import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Battery, CloudSnow, Wind, Sun, CloudRain, CloudFog, CloudLightning, MapPin, Loader, RefreshCw, AlertTriangle, Zap, BarChart2, List } from 'lucide-react';
import '../App.css';
import api from '../services/api';
import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';

const Analytics = () => {
    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useState({ city: 'Scanning...', lat: null, lon: null });
    const [weather, setWeather] = useState({ temp: 0, wind: 0, condition: 'Sunny', code: 0 });
    const [logs, setLogs] = useState([]);

    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        // Fetch logs only if admin
        if (user && user.role === 'admin') {
            api.get('/activity/all')
                .then(res => setLogs(res.data))
                .catch(err => console.error("Failed to fetch logs", err));
        }
    }, [user]);

    // Weather Scenarios for Graphs (Data Models)
    const weatherScenarios = {
        'Sunny': {
            temp: 32, humidity: 45, wind: 10, desc: "OPTIMAL GENERATION",
            batteryData: [
                { time: '00:00', battery: 60 }, { time: '06:00', battery: 55 },
                { time: '10:00', battery: 85 }, { time: '14:00', battery: 100 },
                { time: '18:00', battery: 90 }, { time: '22:00', battery: 75 },
            ],
            dustData: [
                { day: 'Mon', dust: 10 }, { day: 'Tue', dust: 12 }, { day: 'Wed', dust: 15 },
                { day: 'Thu', dust: 18 }, { day: 'Fri', dust: 22 },
            ],
            solarData: [
                { time: '06:00', level: 10 }, { time: '09:00', level: 65 },
                { time: '12:00', level: 100 }, { time: '15:00', level: 80 },
                { time: '18:00', level: 20 }, { time: '21:00', level: 0 },
            ],
            batteryColor: "#10b981", // Emerald
            dustStatus: "NORMAL",
            solarColor: "#f59e0b", // Gold
            solarLabel: "Irradiance"
        },
        'Foggy': { // Winter/Cloudy
            temp: 12, humidity: 88, wind: 15, desc: "WINTER MODE: RESERVES",
            batteryData: [
                { time: '00:00', battery: 85 }, { time: '06:00', battery: 70 },
                { time: '10:00', battery: 68 }, { time: '14:00', battery: 75 },
                { time: '18:00', battery: 60 }, { time: '22:00', battery: 45 },
            ],
            dustData: [
                { day: 'Mon', dust: 45 }, { day: 'Tue', dust: 55 }, { day: 'Wed', dust: 65 },
                { day: 'Thu', dust: 10 }, { day: 'Fri', dust: 20 },
            ],
            solarData: [
                { time: '06:00', level: 5 }, { time: '09:00', level: 25 },
                { time: '12:00', level: 35 }, { time: '15:00', level: 20 },
                { time: '18:00', level: 5 }, { time: '21:00', level: 0 },
            ],
            batteryColor: "#3b82f6", // Blue
            dustStatus: "CRITICAL (STICKY)",
            solarColor: "#94a3b8", // Slate
            solarLabel: "Visibility"
        },
        'Stormy': { // Rain/Storm
            temp: 22, humidity: 95, wind: 45, desc: "STORM ALERT: STOWED",
            batteryData: [
                { time: '00:00', battery: 90 }, { time: '06:00', battery: 88 },
                { time: '12:00', battery: 85 }, { time: '18:00', battery: 80 },
                { time: '23:00', battery: 75 },
            ],
            dustData: [
                { day: 'Mon', dust: 30 }, { day: 'Tue', dust: 10 }, { day: 'Wed', dust: 5 },
                { day: 'Thu', dust: 8 }, { day: 'Fri', dust: 12 },
            ],
            solarData: [
                { time: '06:00', level: 0 }, { time: '09:00', level: 10 },
                { time: '12:00', level: 15 }, { time: '15:00', level: 10 },
                { time: '18:00', level: 0 }, { time: '21:00', level: 0 },
            ],
            batteryColor: "#6366f1", // Indigo
            dustStatus: "RAIN WASHED",
            solarColor: "#6366f1", // Indigo
            solarLabel: "Cloud Density"
        }
    };

    const mapCodeToCondition = (code) => {
        if (code === 0 || code === 1) return 'Sunny';
        if (code >= 2 && code <= 48) return 'Foggy';
        if (code >= 51) return 'Stormy';
        return 'Sunny';
    };

    const getCityName = async (lat, lon) => {
        try {
            const res1 = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
            if (res1.ok) {
                const data1 = await res1.json();
                if (data1.city || data1.locality) return `${data1.city || data1.locality}, ${data1.countryName}`;
            }
        } catch { /* ignore */ }

        try {
            const res2 = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
            if (res2.ok) {
                const data2 = await res2.json();
                const addr = data2.address;
                return `${addr.city || addr.town || addr.district || "Unknown Region"}, ${addr.country}`;
            }
        } catch { /* ignore */ }
        return "Unknown Locality";
    };

    const fetchWeatherData = async (lat, lon) => {
        setLoading(true);
        try {
            const cityName = await getCityName(lat, lon);
            const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
            if (!weatherRes.ok) throw new Error("Service Unavailable");

            const weatherData = await weatherRes.json();
            const current = weatherData.current_weather;

            // Map code to condition directly in setState to avoid unused var
            const cond = mapCodeToCondition(current.weathercode);

            setLocation({ city: cityName, lat, lon });
            setWeather({
                temp: current.temperature,
                wind: current.windspeed,
                condition: cond,
                code: current.weathercode
            });
        } catch {
            setLocation({ city: 'Failed to fetch location', lat: null, lon: null });
            setWeather({ temp: 0, wind: 0, condition: 'Unknown', code: 0 });
        } finally {
            setLoading(false);
        }
    };

    const handleLocateMe = () => {
        if (!navigator.geolocation) {
            setLocation({ city: 'GPS Not Supported', lat: null, lon: null });
            return;
        }
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => fetchWeatherData(pos.coords.latitude, pos.coords.longitude),
            () => { setLoading(false); setError("Location Denied"); fetchWeatherData(28.6139, 77.2090); },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    };

    useEffect(() => { handleLocateMe(); }, []);

    const currentData = weatherScenarios[weather.condition];

    const getWeatherIcon = (condition) => {
        switch (condition) {
            case 'Sunny': return <Sun size={36} className="text-accent" />;
            case 'Foggy': return <CloudFog size={36} className="text-secondary" />;
            case 'Stormy': return <CloudLightning size={36} className="text-secondary" />;
            default: return <Sun size={36} className="text-accent" />;
        }
    };

    // Custom Tooltip for Dark Mode
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const dataPoint = payload[0].payload; // Get full data object
            return (
                <div style={{ background: 'rgba(2, 6, 23, 0.95)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', borderRadius: '12px', color: '#fff', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)' }}>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8', marginBottom: '4px' }}>{label}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: payload[0].stroke }}>{payload[0].value}%</span>
                        {dataPoint.condition && (
                            <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '10px' }}>
                                {dataPoint.condition}
                            </span>
                        )}
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div>
            {/* 1. Header Widget */}
            <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
                        <MapPin size={20} color="#0ea5e9" />
                        <h2 style={{ fontSize: '1.25rem', margin: 0 }} className="text-gradient">
                            {location.city}
                        </h2>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button onClick={handleLocateMe} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            {loading ? <Loader className="animate-spin" size={12} /> : <RefreshCw size={12} />}
                            {loading ? "Scanning..." : "Refine Signal"}
                        </button>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', lineHeight: 1 }}>{weather.temp}°</div>
                        <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>{weather.condition}</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '12px' }}>
                        {getWeatherIcon(weather.condition)}
                    </div>
                </div>
            </div>

            {/* 2. System Status Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', letterSpacing: '-1px' }}>Analytics <span style={{ color: '#0ea5e9' }}>Hub</span></h1>

                <div className="glass-card" style={{ padding: '0.5rem 1.25rem', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid rgba(14, 165, 233, 0.3)' }}>
                    <div style={{ width: '8px', height: '8px', background: currentWeatherColor(weather.condition), borderRadius: '50%', boxShadow: `0 0 10px ${currentWeatherColor(weather.condition)}` }}></div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px' }}>{currentData.desc}</span>
                </div>
            </div>

            {/* 3. Sunlight Weather Profile (Top Priority) */}
            <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                    <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '8px', borderRadius: '8px' }}><Zap color="#f59e0b" size={20} /></div>
                    <div>
                        <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Solar Irradiance Profile</h3>
                        <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Real-time sunlight intensity relative to current weather conditions</div>
                    </div>
                </div>
                <div style={{ height: '300px', width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={currentData.solarData}>
                            <defs>
                                <linearGradient id="colorSolar" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={currentData.solarColor} stopOpacity={0.5} />
                                    <stop offset="95%" stopColor={currentData.solarColor} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                            <YAxis unit="%" hide />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="level" stroke={currentData.solarColor} strokeWidth={3} fillOpacity={1} fill="url(#colorSolar)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 4. Battery Graph */}
            <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                    <Battery size={24} color={currentData.batteryColor} />
                    <div>
                        <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Energy Storage & Utilization Cycle</h3>
                        <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>24-hour battery charge and discharge patterns based on load demand</div>
                    </div>
                </div>
                <div style={{ height: '300px', width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={currentData.batteryData}>
                            <defs>
                                <linearGradient id="colorBattery" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={currentData.batteryColor} stopOpacity={0.4} />
                                    <stop offset="95%" stopColor={currentData.batteryColor} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="battery" stroke={currentData.batteryColor} strokeWidth={3} fillOpacity={1} fill="url(#colorBattery)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 5. Dust Graph */}
            <div className="glass-card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                    <Wind size={20} color="#f59e0b" />
                    <div>
                        <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Panel Cleanliness & Maintenance Status</h3>
                        <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Dust accumulation levels tracking towards the 60% automated cleaning threshold</div>
                        <div style={{ fontSize: '0.85rem', color: '#f59e0b', marginTop: '4px', fontWeight: 'bold' }}>Current Status: {currentData.dustStatus}</div>
                    </div>
                </div>
                <div style={{ height: '300px', width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={currentData.dustData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                            <Tooltip content={<CustomTooltip />} />
                            <ReferenceLine y={60} stroke="#ef4444" strokeDasharray="3 3" />
                            <Line type="stepAfter" dataKey="dust" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, fill: '#f59e0b' }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 6. User Activity Logs - ADMIN ONLY */}
            {user && user.role === 'admin' && (
                <div className="glass-card" style={{ padding: '2rem', marginTop: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                        <List size={24} color="#fff" />
                        <div>
                            <h3 style={{ fontSize: '1.2rem', margin: 0 }}>System Access Logs</h3>
                            <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Real-time audit trail of user interactions (Admin Only)</div>
                        </div>
                    </div>

                    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                            <thead>
                                <tr style={{ background: 'rgba(255,255,255,0.05)', textAlign: 'left' }}>
                                    <th style={{ padding: '12px' }}>Timestamp</th>
                                    <th style={{ padding: '12px' }}>User</th>
                                    <th style={{ padding: '12px' }}>Action</th>
                                    <th style={{ padding: '12px' }}>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.map((log) => (
                                    <tr key={log._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <td style={{ padding: '12px', color: '#94a3b8' }}>{new Date(log.timestamp).toLocaleString()}</td>
                                        <td style={{ padding: '12px', fontWeight: 'bold' }}>{log.userName}</td>
                                        <td style={{ padding: '12px' }}>
                                            <span style={{
                                                padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem',
                                                background: log.action === 'LOGIN' ? 'rgba(16, 185, 129, 0.2)' :
                                                    log.action === 'SIGNUP' ? 'rgba(59, 130, 246, 0.2)' :
                                                        'rgba(255, 255, 255, 0.1)',
                                                color: log.action === 'LOGIN' ? '#10b981' :
                                                    log.action === 'SIGNUP' ? '#3b82f6' : '#fff'
                                            }}>
                                                {log.action}
                                            </span>
                                        </td>
                                        <td style={{ padding: '12px', color: '#94a3b8' }}>
                                            {log.details?.page ? `Visited ${log.details.page}` :
                                                log.details?.email ? `Email: ${log.details.email}` :
                                                    JSON.stringify(log.details)}
                                        </td>
                                    </tr>
                                ))}
                                {logs.length === 0 && (
                                    <tr>
                                        <td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>
                                            No activity recorded yet
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

// Helper for status color
const currentWeatherColor = (cond) => {
    if (cond === 'Sunny') return '#10b981';
    if (cond === 'Foggy') return '#3b82f6';
    return '#6366f1';
}

export default Analytics;
