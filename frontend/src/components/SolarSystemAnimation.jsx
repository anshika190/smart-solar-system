import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Sun, Wind, Zap, RefreshCw, Activity, Database, Cloud } from 'lucide-react';

const SolarSystemAnimation = () => {
    return (
        <div style={{ padding: '6rem 0', background: 'radial-gradient(circle at 50% 50%, #1e293b 0%, #020617 80%)', position: 'relative', overflow: 'hidden' }}>

            {/* Dynamic Atmosphere */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.1, pointerEvents: 'none' }}>
                <div style={{ position: 'absolute', top: '20%', left: '10%', width: '300px', height: '300px', background: '#3b82f6', filter: 'blur(100px)', borderRadius: '50%' }}></div>
                <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '400px', height: '400px', background: '#06b6d4', filter: 'blur(120px)', borderRadius: '50%' }}></div>
            </div>

            <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1rem', color: '#fff', letterSpacing: '-1px' }}>
                        Autonomous Neural Grid
                    </h2>
                    <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginBottom: '5rem' }}>
                        Real-time AI logic visualization.
                    </p>
                </motion.div>

                <div style={{
                    display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 2fr minmax(250px, 1fr)', gap: '2rem', alignItems: 'center',
                    maxWidth: '1400px', margin: '0 auto'
                }}>

                    {/* Left: Input Nodes */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <NodeCard icon={<Sun size={32} color="#facc15" />} title="Solar Irradiance" value="985 W/m²" color="#facc15" delay={0} />
                        <NodeCard icon={<Wind size={32} color="#34d399" />} title="Wind Velocity" value="12 km/h" color="#34d399" delay={0.2} />
                        <NodeCard icon={<Cloud size={32} color="#cbd5e1" />} title="Atmosphere" value="Clear" color="#94a3b8" delay={0.4} />
                    </div>

                    {/* Center: The Smart Panel Simulation */}
                    <div style={{ position: 'relative', minHeight: '500px', perspective: '1200px' }}>

                        {/* 3D Panel Object */}
                        <motion.div
                            style={{
                                width: '100%', height: '360px',
                                background: 'linear-gradient(145deg, #1e293b, #0f172a)',
                                borderRadius: '16px', border: '1px solid #3b82f6',
                                display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px', padding: '8px',
                                boxShadow: '0 50px 100px -20px rgba(0,0,0,0.5)',
                            }}
                            animate={{
                                rotateX: [10, 25, 10],
                                rotateY: [-5, 5, -5]
                            }}
                            transition={{
                                duration: 12, repeat: Infinity, ease: "easeInOut"
                            }}
                        >
                            {[...Array(12)].map((_, i) => (
                                <div key={i} style={{
                                    background: 'rgba(59, 130, 246, 0.1)',
                                    border: '1px solid rgba(59, 130, 246, 0.2)',
                                    borderRadius: '4px', position: 'relative', overflow: 'hidden'
                                }}>
                                    <motion.div
                                        style={{ position: 'absolute', top: 0, left: 0, width: '200%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }}
                                        animate={{ x: ['-100%', '100%'] }}
                                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.1 }}
                                    />
                                </div>
                            ))}

                            {/* Cleaning Drone Layer */}
                            <motion.div
                                style={{
                                    position: 'absolute', top: 0, left: 0, width: '100%', height: '4px',
                                    background: '#f472b6', boxShadow: '0 0 15px #f472b6', zIndex: 10
                                }}
                                animate={{ top: ['5%', '95%', '5%'] }}
                                transition={{ duration: 8, ease: "linear", repeat: Infinity }}
                            />
                        </motion.div>

                        {/* Connection Lines (SVGs) */}
                        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1 }}>
                            <motion.path
                                d="M -100 100 Q 150 200 300 180" stroke="#facc15" strokeWidth="2" fill="none"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.5 }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <motion.path
                                d="M 900 100 Q 600 200 450 180" stroke="#3b82f6" strokeWidth="2" fill="none"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.5 }}
                                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                            />
                        </svg>

                        <motion.div
                            style={{ position: 'absolute', bottom: '-40px', left: '50%', x: '-50%' }}
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', background: 'rgba(59,130,246,0.1)', padding: '8px 16px', borderRadius: '20px', border: '1px solid rgba(59,130,246,0.3)' }}>
                                <RefreshCw size={14} color="#f472b6" className="animate-spin" />
                                <span style={{ color: '#fff', fontSize: '0.9rem' }}>Self-Cleaning Active</span>
                            </div>
                        </motion.div>

                    </div>

                    {/* Right: Output Nodes */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <NodeCard icon={<Zap size={32} color="#fbbf24" />} title="Energy Output" value="4.2 kW" color="#fbbf24" delay={0.6} reverse />
                        <NodeCard icon={<Database size={32} color="#60a5fa" />} title="Grid Injection" value="3.8 kW" color="#60a5fa" delay={0.8} reverse />
                        <NodeCard icon={<Activity size={32} color="#f472b6" />} title="Efficiency" value="99.4%" color="#f472b6" delay={1.0} reverse />
                    </div>

                </div>
            </div>
        </div>
    );
};

const NodeCard = ({ icon, title, value, color, delay, reverse }) => (
    <motion.div
        initial={{ opacity: 0, x: reverse ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ scale: 1.05, borderColor: color }}
        style={{
            background: 'rgba(30, 41, 59, 0.6)', backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '1.5rem',
            display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
        }}
    >
        <div style={{ background: `${color}20`, padding: '10px', borderRadius: '12px' }}>
            {icon}
        </div>
        <div style={{ textAlign: 'left' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{title}</div>
            <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.2rem' }}>{value}</div>
        </div>
    </motion.div>
);

export default SolarSystemAnimation;
