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
            <Navbar />
            <main className="main-content-area">
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
