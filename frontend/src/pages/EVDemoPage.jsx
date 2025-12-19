import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Smartphone, Navigation, BatteryCharging, CheckCircle, Search, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const EVDemoPage = () => {
    const [searchStatus, setSearchStatus] = useState('idle');

    const handleSearch = () => {
        if (searchStatus === 'searching') return;
        setSearchStatus('searching');
        setTimeout(() => {
            setSearchStatus('found');
            window.open('https://www.google.com/maps/search/EV+charging+stations+near+me', '_blank');
            setTimeout(() => setSearchStatus('idle'), 5000);
        }, 1500);
    };

    return (
        <div style={{ minHeight: '100vh', background: '#020617', color: 'white', padding: '2rem' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#22c55e', textDecoration: 'none', marginBottom: '2rem', fontSize: '1.2rem' }}>
                <ArrowLeft size={20} /> Back to Home
            </Link>

            <div style={{ border: '2px solid #22c55e', borderRadius: '16px', padding: '2rem', textAlign: 'center', marginBottom: '4rem', background: 'rgba(34, 197, 94, 0.05)' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#22c55e' }}>
                    EV CHARGING SYSTEM (LIVE DEMO)
                </h1>
                <p style={{ color: '#94a3b8' }}>
                    This is a dedicated verification page for the Smart EV Infrastructure.
                </p>
            </div>

            {/* INLINED EV SYSTEM COMPONENT */}
            <div style={{ padding: '6rem 0', background: 'radial-gradient(circle at 50% 50%, #0f172a 0%, #020617 80%)', position: 'relative', overflow: 'hidden', borderRadius: '24px', minHeight: '600px', border: '1px solid rgba(255,255,255,0.1)' }}>

                {/* Atmosphere */}
                <div style={{ position: 'absolute', inset: 0, opacity: 0.1, pointerEvents: 'none' }}>
                    <div style={{ position: 'absolute', top: '20%', right: '10%', width: '300px', height: '300px', background: '#22c55e', filter: 'blur(100px)', borderRadius: '50%' }}></div>
                    <div style={{ position: 'absolute', bottom: '10%', left: '10%', width: '400px', height: '400px', background: '#3b82f6', filter: 'blur(120px)', borderRadius: '50%' }}></div>
                </div>

                <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto' }}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', color: '#fff' }}>Smart EV Integration</h2>
                        <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginBottom: '5rem' }}>Real-time station discovery and intelligent charging flow.</p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '2rem', alignItems: 'center' }}>
                        {/* Left */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', alignItems: 'flex-end' }}>
                            <NodeCard icon={<Smartphone size={28} color={searchStatus === 'found' ? "#22c55e" : "#60a5fa"} />} title="User App" value={searchStatus === 'found' ? "Route Found!" : (searchStatus === 'searching' ? "Syncing..." : "Locating...")} color={searchStatus === 'found' ? "#22c55e" : "#60a5fa"} delay={0} align="right" pulse={searchStatus === 'found'} />
                            <div onClick={handleSearch} style={{ cursor: 'pointer' }}>
                                <NodeCard icon={<Search size={28} color={searchStatus === 'searching' ? "#fbbf24" : "#f472b6"} className={searchStatus === 'searching' ? "animate-spin" : ""} />} title="Google Maps" value={searchStatus === 'searching' ? "Scanning..." : "Click to Search"} color="#f472b6" delay={0.3} align="right" highlight={true} />
                            </div>
                        </div>

                        {/* Center */}
                        <div style={{ position: 'relative', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <motion.div style={{ width: '180px', height: '180px', background: 'linear-gradient(135deg, #1e293b, #0f172a)', borderRadius: '50%', border: '2px solid #22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 50px rgba(34, 197, 94, 0.3)', position: 'relative', zIndex: 20 }} animate={{ boxShadow: searchStatus === 'searching' ? ['0 0 40px rgba(34, 197, 94, 0.4)', '0 0 100px rgba(34, 197, 94, 0.8)', '0 0 40px rgba(34, 197, 94, 0.4)'] : ['0 0 20px rgba(34, 197, 94, 0.2)', '0 0 60px rgba(34, 197, 94, 0.5)', '0 0 20px rgba(34, 197, 94, 0.2)'] }} transition={{ duration: searchStatus === 'searching' ? 0.5 : 3, repeat: Infinity }}>
                                <Zap size={64} color="#22c55e" />
                                <motion.div style={{ position: 'absolute', width: '240px', height: '240px', border: '1px dashed rgba(34, 197, 94, 0.3)', borderRadius: '50%' }} animate={{ rotate: 360 }} transition={{ duration: 10, ease: "linear", repeat: Infinity }}>
                                    <div style={{ position: 'absolute', top: -10, left: '50%', width: '20px', height: '20px', background: '#22c55e', borderRadius: '50%', boxShadow: '0 0 10px #22c55e' }}></div>
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* Right */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', alignItems: 'flex-start' }}>
                            <NodeCard icon={<BatteryCharging size={28} color="#22c55e" />} title="Charging..." value="85%" color="#22c55e" delay={0.6} align="left" />
                            <NodeCard icon={<CheckCircle size={28} color="#fbbf24" />} title="Est. Range" value="320 km" color="#fbbf24" delay={0.9} align="left" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const NodeCard = ({ icon, title, value, color, delay, align, pulse, highlight }) => (
    <motion.div
        initial={{ opacity: 0, x: align === 'right' ? -30 : 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ scale: 1.05, borderColor: color }}
        style={{
            background: 'rgba(30, 41, 59, 0.6)', backdropFilter: 'blur(10px)',
            border: highlight ? `1px solid ${color}` : '1px solid rgba(255,255,255,0.05)',
            borderRadius: '16px', padding: '1.25rem',
            display: 'flex', alignItems: 'center', gap: '1rem',
            boxShadow: highlight ? `0 0 20px ${color}40` : '0 4px 6px -1px rgba(0,0,0,0.1)', minWidth: '220px',
            flexDirection: align === 'right' ? 'row-reverse' : 'row',
            textAlign: align === 'right' ? 'right' : 'left'
        }}
    >
        <div style={{ background: `${color}20`, padding: '10px', borderRadius: '12px' }}>{icon}</div>
        <div>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{title}</div>
            <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.2rem' }}>{value}</div>
        </div>
    </motion.div>
);

export default EVDemoPage;
