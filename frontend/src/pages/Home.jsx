import React from 'react';

const Home = () => {
    return (
        <div style={{ maxWidth: '800px' }}>
            <h1 style={{ fontSize: '2rem', color: '#0f172a', marginBottom: '1rem' }}>Welcome to SolarGov</h1>
            <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: '1.6', marginBottom: '2rem' }}>
                The Central Intelligence Dashboard for the "Smart Solar Energy Management System".
                Targeting 99.9% uptime and maximum energy efficiency through AI-driven monitoring.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ marginBottom: '0.5rem', color: '#334155' }}>System Status</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#16a34a' }}>Normal</p>
                    <p style={{ color: '#64748b', fontSize: '0.9rem' }}>All systems operational.</p>
                </div>
                <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ marginBottom: '0.5rem', color: '#334155' }}>Active Panels</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2563eb' }}>12,450</p>
                    <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Connected to grid.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
