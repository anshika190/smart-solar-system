import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShieldCheck, Zap, BarChart, ArrowRight, Layers, Globe, Cpu, Activity } from 'lucide-react';
import './LandingPage.css';

import SolarSystemAnimation from '../components/SolarSystemAnimation';
import EVNetworkAnimation from '../components/EVNetworkAnimation';

const LandingPage = () => {
    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-grid">
                    <div className="hero-content">
                        <div className="badge" style={{ background: '#22c55e', color: 'white' }}>System Online v2.0</div>
                        <h1>Smart Solar <br /><span className="text-gradient">Intelligence</span></h1>
                        <p className="hero-subtitle">
                            Empowering government infrastructures with real-time solar analytics,
                            AI-driven efficiency, and seamless grid integration.
                        </p>
                        <div className="hero-actions">
                            <NavLink to="/monitor" className="btn btn-primary">
                                Access Dashboard <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                            </NavLink>
                            <NavLink to="/about" className="btn btn-secondary">
                                View Documentation
                            </NavLink>
                        </div>
                        <div className="hero-stats-mini">
                            <div className="mini-stat">
                                <span className="value">99.9%</span>
                                <span className="label">Uptime</span>
                            </div>
                            <div className="divider"></div>
                            <div className="mini-stat">
                                <span className="value">50ms</span>
                                <span className="label">Latency</span>
                            </div>
                            <div className="divider"></div>
                            <div className="mini-stat">
                                <span className="value">ISO</span>
                                <span className="label">Certified</span>
                            </div>
                        </div>
                    </div>

                    <div className="hero-visual">
                        <div className="image-wrapper hero-wrapper">
                            <img src="/assets/hero-solar.png" alt="Futuristic Solar Grid" className="hero-image" />
                            <div className="overlay-data">
                                <div className="data-card top-right floating-card">
                                    <Activity size={20} className="icon-pulse" />
                                    <span>AI Optimization Active</span>
                                </div>
                                <div className="data-card bottom-left floating-card-reverse">
                                    <Zap size={20} className="icon-yellow" />
                                    <span>Grid Feed: 1.2GW</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Banner */}
            <section className="stats-banner">
                <div className="container">
                    <div className="stat-box">
                        <Globe size={32} className="stat-icon" />
                        <h3>12,450</h3>
                        <p>Active Panels</p>
                    </div>
                    <div className="stat-box">
                        <Zap size={32} className="stat-icon" />
                        <h3>1.2 GWh</h3>
                        <p>Energy Generated</p>
                    </div>
                    <div className="stat-box">
                        <Cpu size={32} className="stat-icon" />
                        <h3>24/7</h3>
                        <p>AI Monitoring</p>
                    </div>
                    <div className="stat-box">
                        <Layers size={32} className="stat-icon" />
                        <h3>Zero</h3>
                        <p>Carbon Footprint</p>
                    </div>
                </div>
            </section>

            {/* NEW: Solar System Animation Logic */}
            <SolarSystemAnimation />

            {/* Features Grid */}
            <section className="features-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Enterprise Grade Solutions</h2>
                        <p>Built for scale, security, and sustainability.</p>
                    </div>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="icon-wrapper"><Activity size={28} /></div>
                            <h3>Real-time Telementry</h3>
                            <p>High-frequency sensor data streaming for granular visibility into grid performance.</p>
                        </div>
                        <div className="feature-card">
                            <div className="icon-wrapper"><ShieldCheck size={28} /></div>
                            <h3>Secure & Compliant</h3>
                            <p>End-to-end encryption complying with federal energy data standards.</p>
                        </div>
                        <div className="feature-card">
                            <div className="icon-wrapper"><BarChart size={28} /></div>
                            <h3>Predictive AI</h3>
                            <p>Machine learning models that forecast maintenance needs before failures occur.</p>
                        </div>
                        <div className="feature-card">
                            <div className="icon-wrapper"><Layers size={28} /></div>
                            <h3>Load Balancing</h3>
                            <p>Automated distribution of energy loads across battery and grid infrastructure.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* EV Pulse Section */}
            <section className="ev-section">
                <div className="container ev-grid">
                    <div className="ev-content">
                        <div className="badge badge-green">New Feature</div>
                        <h2>Smart EV Infrastructure</h2>
                        <p>Integrated electric vehicle charging powered by surplus solar energy. Our smart load balancing prioritizes renewable sources before tapping into the grid.</p>
                        <ul className="ev-features">
                            <li><Zap size={18} /> Dynamic Load Balancing</li>
                            <li><Globe size={18} /> Location-Based Availability</li>
                            <li><Cpu size={18} /> Solar-First Charging Logic</li>
                        </ul>
                    </div>
                    <div className="ev-visual">
                        <img src="/assets/ev-station.png" alt="Smart EV Charging Station" className="rounded-xl shadow-2xl" />
                    </div>
                </div>
            </section>

            {/* Smart EV Animation Hub */}
            <EVNetworkAnimation />

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-content">
                    <h2>Ready to modernize your infrastructure?</h2>
                    <p>Deploy SolarGov Intelligence on your local grid today.</p>
                    <NavLink to="/monitor" className="btn btn-white">
                        Initialize System
                    </NavLink>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
