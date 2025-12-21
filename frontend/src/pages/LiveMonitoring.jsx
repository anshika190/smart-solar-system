import React, { useState, useEffect } from 'react';
import { Sun, Wind, Thermometer, Battery, Zap, Activity, RotateCw, CloudRain, CheckCircle, AlertTriangle, MapPin, Navigation, ArrowRight } from 'lucide-react';
import SmartEVSystem from '../components/SmartEVSystem';
import './LiveMonitoring.css';

const LiveMonitoring = () => {
    // CONSTANTS
    const PANEL_AREA = 25; // m² (A)
    const EFFICIENCY = 0.18; // 18% (η)
    const SOC_MIN = 30; // Minimum State of Charge %
    const RADIUS_KM = 5; // EV Station radius

    // State for sensors and system
    const [systemState, setSystemState] = useState({
        irradiance: 0, // I (W/m²)
        dust: 0,
        temp: 0,
        soc: 50, // State of Charge (%)
        loadDemand: 4.5, // P_req (kW)
        evCount: 2,
        userLat: 28.6139,
        userLong: 77.2090,
        timestamp: new Date().toISOString()
    });

    // Computed Logic State
    const [logicState, setLogicState] = useState({
        p_solar: 0, // kW
        energySource: 'Grid',
        batteryStatus: 'Idle',
        p_per_ev: 0,
        stations: [],
        panelAngle: 10,
        cleaningSystem: 'OFF'
    });

    const [loading, setLoading] = useState(true);

    // --- ALGORITHM IMPLEMENTATION (Exact Logic Preserved, Hidden from UI) ---

    // 1. Calculate Solar Power Generation (P_solar = I * A * η)
    const calculateSolarPower = (I) => {
        return (I * PANEL_AREA * EFFICIENCY) / 1000;
    };

    // 2. Continuous Logic Cycle
    const runControlAlgorithms = (sensors) => {
        const { irradiance, soc, loadDemand, evCount, dust } = sensors;

        // Step 1: Calculate P_solar
        const p_solar = calculateSolarPower(irradiance);

        let source = 'Grid';
        let batStatus = 'Idle';
        let angle = 10;
        let cleaning = 'OFF';

        // Step 2: Determine Available Energy Source
        if (p_solar >= loadDemand) {
            source = 'Solar';
        } else if (soc > SOC_MIN) {
            source = 'Battery';
        } else {
            source = 'Grid';
        }

        // Step 3: Battery Charging/Discharging Logic
        if (p_solar > loadDemand) {
            batStatus = 'Charging';
        } else {
            batStatus = 'Discharging';
        }

        // Step 4: EV Charging Load Distribution
        let p_available = 0;
        if (source === 'Solar') p_available = p_solar - loadDemand;
        if (source === 'Battery') p_available = 5;
        if (source === 'Grid') p_available = 20;

        p_available = Math.max(0, p_available);
        const p_ev_distribution = evCount > 0 ? (p_available / evCount) : 0;

        // Angle Logic
        if (irradiance <= 20) {
            angle = 10;
        } else {
            angle = Math.floor((irradiance / 1000) * 60);
        }

        // Cleaning Logic
        if (dust >= 60) {
            cleaning = 'ACTIVE';
        }

        return {
            p_solar: p_solar.toFixed(2),
            energySource: source,
            batteryStatus: batStatus,
            p_per_ev: p_ev_distribution.toFixed(2),
            panelAngle: angle,
            cleaningSystem: cleaning
        };
    };

    // Step 5: Station Distance Logic
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const runStationLogic = (lat, long) => {
        const mockStations = [
            { id: 1, name: 'Central Plaza EV', lat: 28.6129, long: 77.2295 },
            { id: 2, name: 'North Highway', lat: 28.6600, long: 77.2100 },
            { id: 3, name: 'Tech Park South', lat: 28.5500, long: 77.2500 }
        ];

        return mockStations.map(station => {
            const dist = calculateDistance(lat, long, station.lat, station.long);
            return { ...station, distance: dist.toFixed(2), visible: dist <= RADIUS_KM };
        });
    };

    // Simulation Loop
    useEffect(() => {
        const interval = setInterval(() => {
            setSystemState(prev => {
                const now = new Date();
                const isDay = now.getSeconds() % 20 > 5;
                const irradiance = isDay ? 600 + Math.random() * 200 : 0;
                const dust = prev.dust >= 65 ? 10 : prev.dust + 2;

                const newSensors = {
                    ...prev,
                    irradiance,
                    dust,
                    soc: Math.max(20, Math.min(100, prev.soc + (irradiance > 500 ? 1 : -0.5))),
                    timestamp: now.toISOString()
                };

                const computed = runControlAlgorithms(newSensors);
                const stations = runStationLogic(newSensors.userLat, newSensors.userLong);

                setLogicState({ ...computed, stations });
                setLoading(false);
                return newSensors;
            });
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    if (loading) return <div className="loading-screen">Starting System...</div>;

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div>
                    <h1>System Control Center</h1>
                    <p className="subtitle">Live Operational Status</p>
                </div>
                <div className="status-badge">
                    <div className="pulse-dot"></div>
                    OPERATIONAL
                </div>
            </div>

            {/* Visual Logic Grid */}
            <div className="logic-grid">

                {/* 1. Solar Generation (Gauge) */}
                <div className="control-card">
                    <div className="card-header">
                        <Sun size={24} className="icon-blue" />
                        <h3>Solar Generation</h3>
                    </div>
                    <div className="visual-display centered">
                        <div className="circular-gauge">
                            <svg viewBox="0 0 36 36" className="circular-chart">
                                <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                <path className="circle"
                                    strokeDasharray={`${(logicState.p_solar / 5) * 100}, 100`}
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <text x="18" y="20.35" className="percentage">{logicState.p_solar} kW</text>
                            </svg>
                        </div>
                        <div className="sub-stat">
                            <span>Irradiance: {Math.round(systemState.irradiance)} W/m²</span>
                            <span>Efficiency: 18%</span>
                        </div>
                    </div>
                </div>

                {/* 2. Active Source Flow (Diagram) */}
                <div className="control-card">
                    <div className="card-header">
                        <Activity size={24} className="icon-green" />
                        <h3>Power Flow</h3>
                    </div>
                    <div className="power-flow-diagram">
                        {/* Source Icons */}
                        <div className="source-row">
                            <div className={`source-icon ${logicState.energySource === 'Solar' ? 'active-source' : 'inactive'}`}>
                                <Sun size={20} /> Solar
                            </div>
                            <div className={`source-icon ${logicState.energySource === 'Battery' ? 'active-source' : 'inactive'}`}>
                                <Battery size={20} /> Batt
                            </div>
                            <div className={`source-icon ${logicState.energySource === 'Grid' ? 'active-source' : 'inactive'}`}>
                                <Zap size={20} /> Grid
                            </div>
                        </div>

                        {/* Animated Arrow */}
                        <div className="flow-animation">
                            <div className="arrow-path">
                                <div className="arrow-head">▼</div>
                            </div>
                        </div>

                        {/* Load */}
                        <div className="load-icon active-load">
                            <strong>System Load</strong>
                            <span>{systemState.loadDemand} kW</span>
                        </div>
                    </div>
                </div>

                {/* 3. EV Distribution (Speedometer) */}
                <div className="control-card">
                    <div className="card-header">
                        <Zap size={24} className="icon-yellow" />
                        <h3>EV Power Allocation</h3>
                    </div>
                    <div className="visual-gauge speedometer">
                        <div className="speedometer-arch">
                            <div className="needle" style={{ transform: `rotate(${(Math.min(logicState.p_per_ev, 10) / 10) * 180 - 90}deg)` }}></div>
                        </div>
                        <div className="gauge-value">{logicState.p_per_ev} kW</div>
                        <div className="gauge-label">Per Station</div>
                        <div className="connected-tag">{systemState.evCount} Systems Connected</div>
                    </div>
                </div>
            </div>

            {/* Smart Features Row */}
            <div className="features-row">
                <div className="feature-tile">
                    <div className="f-icon"><RotateCw size={20} /></div>
                    <div className="f-content">
                        <span className="label">Panel Angle</span>
                        <span className="value">{logicState.panelAngle}°</span>
                        <span className="sub">{logicState.panelAngle === 10 ? 'Parked' : 'Optimized'}</span>
                    </div>
                </div>
                <div className={`feature-tile ${logicState.cleaningSystem === 'ACTIVE' ? 'alert-tile' : ''}`}>
                    <div className="f-icon"><Wind size={20} /></div>
                    <div className="f-content">
                        <span className="label">Cleaning Sys</span>
                        <span className="value">{logicState.cleaningSystem}</span>
                        <span className="sub">Dust: {Math.round(systemState.dust)}%</span>
                    </div>
                </div>
                <div className="feature-tile">
                    <div className="f-icon"><MapPin size={20} /></div>
                    <div className="f-content">
                        <span className="label">Nearby Stations</span>
                        <span className="value">{logicState.stations.filter(s => s.visible).length}</span>
                        <span className="sub">Within 5km</span>
                    </div>
                </div>
            </div>

            {/* EV SYSTEM INTEGRATION - INLINED FOR STABILITY */}
            <div style={{ marginBottom: '60px', marginTop: '40px', border: '1px solid #334155', borderRadius: '20px', padding: '0', overflow: 'hidden', background: '#0f172a' }}>
                <div style={{ padding: '20px', background: '#1e293b', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ margin: 0, color: '#22c55e', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Zap size={24} fill="#22c55e" /> SMART EV INFRASTRUCTURE
                    </h2>
                    <span style={{ background: '#22c55e', color: 'black', padding: '4px 12px', borderRadius: '4px', fontWeight: 'bold' }}>LIVE V27.0</span>
                </div>

                <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px', background: 'radial-gradient(circle at 50% 50%, #1e293b 0%, #020617 100%)' }}>
                    {/* 1. Status Display */}
                    <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', minWidth: '200px', textAlign: 'center', border: '1px solid #3b82f6' }}>
                            <div style={{ color: '#94a3b8', marginBottom: '5px' }}>User App Status</div>
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6' }}>Route Found</div>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', minWidth: '200px', textAlign: 'center', border: '1px solid #22c55e' }}>
                            <div style={{ color: '#94a3b8', marginBottom: '5px' }}>Charging Status</div>
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#22c55e' }}>85% Charged</div>
                        </div>
                    </div>

                    {/* 2. Interactive Search Button */}
                    <div style={{ position: 'relative', padding: '40px' }}>
                        <div style={{
                            width: '200px', height: '200px', borderRadius: '50%', border: '4px solid #22c55e',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 0 50px rgba(34, 197, 94, 0.3)', cursor: 'pointer',
                            background: '#020617'
                        }}
                            onClick={() => window.open('https://www.google.com/maps/search/EV+charging+stations+near+me', '_blank')}
                        >
                            <div style={{ textAlign: 'center' }}>
                                <MapPin size={48} color="#22c55e" style={{ marginBottom: '10px' }} />
                                <div style={{ color: 'white', fontWeight: 'bold' }}>FIND STATIONS</div>
                                <div style={{ color: '#22c55e', fontSize: '12px', marginTop: '5px' }}>(Click Demo)</div>
                            </div>
                        </div>
                    </div>

                    <div style={{ color: '#94a3b8', fontSize: '14px' }}>
                        * This system automatically optimizes charging routes based on solar availability.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveMonitoring;
