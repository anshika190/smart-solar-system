import React from 'react';
import { User, Code, Zap, Globe, Cpu, GraduationCap, ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { User, Code, Zap, Globe, Cpu, GraduationCap, ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

const About = () => {
    return (
        <div style={{ minHeight: '100vh', padding: '2rem', paddingTop: '6rem', maxWidth: '1200px', margin: '0 auto', fontFamily: '"Inter", sans-serif' }}>

            {/* Hero Profile Section */}
            <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                marginBottom: '5rem', position: 'relative'
            }}>
                <div style={{
                    width: '120px', height: '120px', borderRadius: '50%', background: 'linear-gradient(135deg, #60a5fa 0%, #34d399 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem',
                    boxShadow: '0 10px 30px -10px rgba(96, 165, 250, 0.5)'
                }}>
                    <User size={60} color="#fff" />
                </div>
                <h1 style={{
                    fontSize: '3.5rem', fontWeight: '800', marginBottom: '0.5rem',
                    background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                }}>
                    Anshika Garg
                </h1>
                <p style={{ fontSize: '1.25rem', color: '#94a3b8', marginBottom: '1rem' }}>
                    Aspiring Software Engineer & Full Stack Developer
                </p>
                <div style={{ display: 'flex', gap: '10px', color: '#cbd5e1', fontSize: '0.95rem', fontWeight: '500' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <GraduationCap size={18} color="#60a5fa" /> CGC - College of Engineering, Landran
                    </span>
                </div>
            </div>

            {/* The Project Story */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>

                {/* Core Problem & Impact */}
                <div className="glass-card" style={{ padding: '2.5rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(15, 23, 42, 0.4)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px' }}><Zap size={24} color="#f87171" /></div>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#fff', margin: 0 }}>The Challenge</h2>
                    </div>
                    <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '1.1rem' }}>
                        Traditional solar energy systems are often inefficient due to dust accumulation and static positioning, causing up to <strong>40% energy loss</strong>. Furthermore, the rapid rise of EVs faces a critical infrastructure gap—drivers simply can't find reliable, green charging stations easily.
                    </p>
                </div>

                {/* The Solution & Contribution */}
                <div className="glass-card" style={{ padding: '2.5rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(15, 23, 42, 0.4)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div style={{ padding: '12px', background: 'rgba(52, 211, 153, 0.1)', borderRadius: '12px' }}><Cpu size={24} color="#34d399" /></div>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#fff', margin: 0 }}>My Solution</h2>
                    </div>
                    <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '1.1rem' }}>
                        I architected and built the <strong>"SolarGov Intelligence"</strong> platform—a unified web system that uses AI logic to automate solar maintenance and integrates real-time EV charging discovery. My goal was to demonstrate how <strong>Web Technologies (MERN)</strong> can solve complex physical infrastructure problems.
                    </p>
                </div>

            </div>

            {/* Skills & Methodology Section */}
            <div style={{ marginBottom: '5rem' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#fff', textAlign: 'center', marginBottom: '3rem' }}>
                    Technical Arsenal & Methodology
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    {[
                        { title: 'Full Stack Architecture', desc: 'Designed the complete flow from React frontend to Node.js backend.', icon: <Globe color="#60a5fa" /> },
                        { title: 'Secure Authentication', desc: 'Implemented JWT-based security and Role-Based Access Control (RBAC) implementation.', icon: <Code color="#a78bfa" /> },
                        { title: 'Data Visualization', desc: 'Built real-time dashboards to visualize complex energy data.', icon: <Zap color="#fbbf24" /> },
                        { title: 'System Design', desc: 'Engineered a scalable schema for Users, Logs, and Energy metrics.', icon: <Cpu color="#f472b6" /> },
                    ].map((skill, i) => (
                        <div key={i} style={{
                            background: 'rgba(30, 41, 59, 0.5)', padding: '2rem', borderRadius: '16px',
                            border: '1px solid rgba(255,255,255,0.03)', transition: 'transform 0.2s'
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ marginBottom: '1rem' }}>{skill.icon}</div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#e2e8f0', marginBottom: '0.5rem' }}>{skill.title}</h3>
                            <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6' }}>{skill.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Career Goals / Footer */}
            <div style={{
                background: 'linear-gradient(to right, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))',
                borderRadius: '24px', padding: '4rem', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)'
            }}>
                <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#fff', marginBottom: '1rem' }}>Ready to Build the Future</h2>
                <p style={{ fontSize: '1.2rem', color: '#cbd5e1', maxWidth: '700px', margin: '0 auto 2rem auto', lineHeight: '1.6' }}>
                    This research project represents my passion for combining <strong style={{ color: '#fff' }}>Clean Code</strong> with <strong style={{ color: '#fff' }}>Clean Energy</strong>.
                    I am actively seeking opportunities to apply my Full Stack development skills to build impactful, scalable software solutions.
                </p>
                <div style={{ display: 'inline-flex', gap: '1rem' }}>
                    <div style={{ display: 'inline-flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <button
                            onClick={() => window.open('https://github.com/anshika190/smart-solar-system', '_blank')}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 24px',
                                borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)',
                                background: 'rgba(255,255,255,0.05)', color: '#fff', fontWeight: '600', cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <Github size={18} /> View Research Code
                        </button>

                        <button
                            onClick={() => window.open('https://www.linkedin.com/in/anshika-garg-8647732b6/', '_blank')}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 24px',
                                borderRadius: '50px', border: '1px solid #0077b5',
                                background: 'rgba(0, 119, 181, 0.2)', color: '#fff', fontWeight: '600', cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(0, 119, 181, 0.4)';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(0, 119, 181, 0.2)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <Linkedin size={18} /> Connect on LinkedIn
                        </button>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '3rem', textAlign: 'center', color: '#64748b', fontSize: '0.9rem' }}>
                &copy; 2025 Anshika Garg • Developed for Academic Research at CGC Landran
            </div>
        </div>
    );
};

export default About;
