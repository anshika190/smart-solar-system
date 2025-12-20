import React, { useEffect, useContext } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import './MainLayout.css';
import { AuthContext } from '../../auth/AuthContext';
import api from '../../services/api';

const MainLayout = () => {
    const { pathname } = useLocation();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            // Log page visit
            api.post('/activity/log', {
                userId: user.id || user._id,
                page: pathname
            }).catch(err => {
                // Silent fail for tracking
                console.error("Tracking Error:", err);
            });
        }
    }, [pathname, user]);

    return (
        <div className="layout-container">
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                background: 'red',
                color: 'yellow',
                zIndex: 99999,
                textAlign: 'center',
                padding: '10px',
                fontWeight: 'bold',
                fontSize: '20px',
                borderBottom: '5px solid yellow'
            }}>
                DEBUG: V25.0 LIVE - UPDATE SUCCESSFUL
                <a href="/final-demo" style={{ marginLeft: '20px', color: 'white', textDecoration: 'underline' }}>OPEN DEMO DIRECTLY</a>
            </div>
            <Navbar />
            <main className="main-content-area" style={{ marginTop: '50px' }}>
                <Outlet />
            </main>
            <footer className="site-footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <h4>SolarGov Intelligence</h4>
                        <p>Official Renewable Energy Monitoring Portal</p>
                    </div>
                    <div className="footer-section">
                        <span className="footer-link">Privacy</span>
                        <span className="footer-link">Terms</span>
                        <span className="footer-link">Contact</span>
                    </div>
                    <div className="footer-section">
                        <p className="copyright">© 2025 Government Energy Dept. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
