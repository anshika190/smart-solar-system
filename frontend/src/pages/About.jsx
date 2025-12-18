import React from 'react';
import { Shield, Zap, Server, Globe, Cpu, Award } from 'lucide-react';

const About = () => {
    return (
        <div style={{ minHeight: '100vh', padding: '2rem', paddingTop: '6rem', maxWidth: '1200px', margin: '0 auto' }}>
            {/* Hero Section */}
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                <h1 style={{
                    fontSize: '4rem', fontWeight: '800',
                    background: 'linear-gradient(to right, #60a5fa, #34d399)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    marginBottom: '1.5rem', letterSpacing: '-0.05em'
                }}>
                    SolarGov Intelligence
                </h1>
                <p style={{ fontSize: '1.25rem', color: '#94a3b8', maxWidth: '700px', margin: '0 auto', lineHeight: '1.8' }}>
                    The world's most advanced <strong>AI-driven renewable energy monitoring system</strong>.
                    Designed to optimize national grid efficiency through real-time predictive analytics.
                </p>
            </div>

            {/* Glowing Stats Grid */}
            <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '5rem'
            }}>
                {[
                    { icon: <Cpu size={32} color="#60a5fa" />, value: "99.9%", label: "System Uptime" },
                    { icon: <Zap size={32} color="#fbbf24" />, value: "1.2 GW", label: "Managed Power" },
                    { icon: <Globe size={32} color="#34d399" />, value: "15 Cities", label: "Active Deployments" },
                ].map((stat, i) => (
                    <div key={i} className="glass-card" style={{
                        padding: '2.5rem', textAlign: 'center',
                        border: '1px solid rgba(255,255,255,0.05)',
                        position: 'relative', overflow: 'hidden'
                    }}>
                        <div style={{
                            background: 'rgba(255,255,255,0.03)', borderRadius: '50%', width: '80px', height: '80px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto'
                        }}>
                            {stat.icon}
                        </div>
                        <h3 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#fff', marginBottom: '0.5rem' }}>{stat.value}</h3>
                        <p style={{ color: '#94a3b8', fontWeight: '500' }}>{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Mission & Tech Sections */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>

                {/* Mission Card */}
                <div className="glass-card" style={{ padding: '3rem', borderLeft: '4px solid #60a5fa' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <Shield size={28} color="#60a5fa" />
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#f1f5f9' }}>Our Mission</h2>
                    </div>
                    <p style={{ color: '#cbd5e1', lineHeight: '1.8', fontSize: '1.1rem' }}>
                        To accelerate the global transition to clean energy by making solar infrastructure
                        <strong> smarter, self-healing, and highly efficient</strong>. We eliminate the guesswork from
                        maintenance using autonomous cleaning triggers and AI load balancing.
                    </p>
                </div>

                {/* Tech Stack Card */}
                <div className="glass-card" style={{ padding: '3rem', borderLeft: '4px solid #f472b6' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <Server size={28} color="#f472b6" />
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#f1f5f9' }}>Core Technology</h2>
                    </div>
                    <ul style={{ color: '#cbd5e1', lineHeight: '2', fontSize: '1.1rem', paddingLeft: '0', listStyle: 'none' }}>
                        {[
                            "Open-Meteo Real-time Weather API integration",
                            "Geolocation-based Solar Angle Calculation",
                            "Deep Learning Dust Accumulation Models",
                            "Node.js & Express High-Performance Backend"
                        ].map((item, i) => (
                            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ width: '6px', height: '6px', background: '#f472b6', borderRadius: '50%' }}></span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

            </div>

            {/* Footer Note */}
            <div style={{ marginTop: '5rem', textAlign: 'center', color: '#64748b', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '1rem' }}>
                    <Award size={16} /> Certified Green Technology Provider
                </div>
                SolarGov Intelligence Suite v2.5.0 • Enterprise Edition
            </div>
        </div>
    );
};

export default About;
