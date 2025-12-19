import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Zap, Smartphone, Navigation, BatteryCharging, CheckCircle, Search } from 'lucide-react';

const EVNetworkAnimation = () => {
    const [searchStatus, setSearchStatus] = useState('idle'); // idle, searching, found

    const handleSearch = () => {
        if (searchStatus === 'searching') return;
        setSearchStatus('searching');

        // Simulate network delay then find route
        setTimeout(() => {
            setSearchStatus('found');
            // Open real Google Maps in new tab
            window.open('https://www.google.com/maps/search/EV+charging+stations+near+me', '_blank');

            // Reset after 5 seconds
            setTimeout(() => setSearchStatus('idle'), 5000);
        }, 1500);
    };

    return (
        <div style={{ padding: '6rem 0', background: 'radial-gradient(circle at 50% 50%, #0f172a 0%, #020617 80%)', position: 'relative', overflow: 'hidden', borderRadius: '24px', margin: '4rem 0' }}>

            {/* Dynamic Atmosphere */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.1, pointerEvents: 'none' }}>
                <div style={{ position: 'absolute', top: '20%', right: '10%', width: '300px', height: '300px', background: '#22c55e', filter: 'blur(100px)', borderRadius: '50%' }}></div>
                <div style={{ position: 'absolute', bottom: '10%', left: '10%', width: '400px', height: '400px', background: '#3b82f6', filter: 'blur(120px)', borderRadius: '50%' }}></div>
            </div>

            <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', color: '#fff', letterSpacing: '-1px' }}>
                        Smart EV Integration
                    </h2>
                    <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginBottom: '5rem' }}>
                        Real-time station discovery and intelligent charging flow.
                    </p>
                </motion.div>

                <div style={{
                    display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '2rem', alignItems: 'center',
                    maxWidth: '1200px', margin: '0 auto'
                }}>

                    {/* Left: User Discovery */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', alignItems: 'flex-end' }}>
                        <NodeCard
                            icon={<Smartphone size={28} color={searchStatus === 'found' ? "#22c55e" : "#60a5fa"} />}
                            title="User App"
                            value={searchStatus === 'found' ? "Route Found!" : (searchStatus === 'searching' ? "Syncing..." : "Locating...")}
                            color={searchStatus === 'found' ? "#22c55e" : "#60a5fa"}
                            delay={0}
                            align="right"
                            pulse={searchStatus === 'found'}
                        />

                        <div onClick={handleSearch} style={{ cursor: 'pointer' }}>
                            <NodeCard
                                icon={<Search size={28} color={searchStatus === 'searching' ? "#fbbf24" : "#f472b6"} className={searchStatus === 'searching' ? "animate-spin" : ""} />}
                                title="Google Maps"
                                value={searchStatus === 'searching' ? "Scanning..." : "Click to Search"}
                                color="#f472b6"
                                delay={0.3}
                                align="right"
                                highlight={true}
                            />
                        </div>
                    </div>

                    {/* Center: The Hub Simulation */}
                    <div style={{ position: 'relative', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                        {/* Central Hub Node */}
                        <motion.div
                            style={{
                                width: '180px', height: '180px',
                                background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                                borderRadius: '50%', border: '2px solid #22c55e',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: searchStatus === 'searching' ? '0 0 80px rgba(34, 197, 94, 0.6)' : '0 0 50px rgba(34, 197, 94, 0.3)',
                                position: 'relative', zIndex: 20
                            }}
                            animate={{
                                boxShadow: searchStatus === 'searching'
                                    ? ['0 0 40px rgba(34, 197, 94, 0.4)', '0 0 100px rgba(34, 197, 94, 0.8)', '0 0 40px rgba(34, 197, 94, 0.4)']
                                    : ['0 0 20px rgba(34, 197, 94, 0.2)', '0 0 60px rgba(34, 197, 94, 0.5)', '0 0 20px rgba(34, 197, 94, 0.2)']
                            }}
                            transition={{ duration: searchStatus === 'searching' ? 0.5 : 3, repeat: Infinity }}
                        >
                            <Zap size={64} color="#22c55e" />

                            {/* Orbiting Elements */}
                            <motion.div
                                style={{
                                    position: 'absolute', width: '240px', height: '240px',
                                    border: '1px dashed rgba(34, 197, 94, 0.3)', borderRadius: '50%'
                                }}
                                animate={{ rotate: 360 }}
                                transition={{ duration: searchStatus === 'searching' ? 2 : 20, ease: "linear", repeat: Infinity }}
                            >
                                <div style={{ position: 'absolute', top: -10, left: '50%', width: '20px', height: '20px', background: '#22c55e', borderRadius: '50%', boxShadow: '0 0 10px #22c55e' }}></div>
                            </motion.div>
                        </motion.div>

                        {/* Animated Connection Lines */}
                        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 5 }}>
                            {/* Left to Center */}
                            <motion.path
                                d="M 50 100 Q 150 200 250 200" stroke="#60a5fa" strokeWidth="3" fill="none" strokeDasharray="10 10"
                                initial={{ pathLength: 0, opacity: 0.2 }}
                                animate={{ pathLength: 1, opacity: 1, strokeDashoffset: searchStatus === 'searching' ? -500 : -200 }}
                                transition={{ duration: searchStatus === 'searching' ? 0.5 : 2, repeat: Infinity, ease: "linear" }}
                            />
                            {/* Center to Right */}
                            <motion.path
                                d="M 430 200 Q 550 200 650 100" stroke="#22c55e" strokeWidth="3" fill="none"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1, opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                        </svg>

                        {/* Status Badge */}
                        <motion.div
                            style={{ position: 'absolute', bottom: '20px', left: '50%', translateX: '-50%' }}
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', background: 'rgba(34, 197, 94, 0.1)', padding: '8px 16px', borderRadius: '20px', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                                <Navigation size={14} color="#22c55e" className="animate-pulse" />
                                <span style={{ color: '#fff', fontSize: '0.9rem' }}>
                                    {searchStatus === 'searching' ? "Optimizing Route..." : "Route Optimized"}
                                </span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Vehicle Status */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', alignItems: 'flex-start' }}>
                        <NodeCard icon={<BatteryCharging size={28} color="#22c55e" />} title="Charging..." value="85%" color="#22c55e" delay={0.6} align="left" />
                        <NodeCard icon={<CheckCircle size={28} color="#fbbf24" />} title="Est. Range" value="320 km" color="#fbbf24" delay={0.9} align="left" />
                    </div>

                </div>
            </div>
        </div>
    );
};

const NodeCard = ({ icon, title, value, color, delay, align, pulse, highlight }) => (
    <motion.div
        initial={{ opacity: 0, x: align === 'right' ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ scale: 1.05, borderColor: color }}
        animate={pulse ? { scale: [1, 1.05, 1], borderColor: [color, '#fff', color] } : {}}
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
        <div style={{ background: `${color}20`, padding: '10px', borderRadius: '12px' }}>
            {icon}
        </div>
        <div>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{title}</div>
            <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.2rem' }}>{value}</div>
        </div>
    </motion.div>
);

export default EVNetworkAnimation;
