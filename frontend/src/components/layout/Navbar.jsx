import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Sun } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <NavLink to="/" className="navbar-logo">
                    <div className="logo-icon">
                        <Sun size={24} color="#fcd34d" fill="#fcd34d" />
                    </div>
                    <span className="brand-name">SolarAI</span>
                </NavLink>

                <div className="navbar-toggle" onClick={toggleMenu}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </div>

                <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
                    <li className="nav-item">
                        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end onClick={toggleMenu}>
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/monitor" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={toggleMenu}>
                            Live Monitoring
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/analytics" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={toggleMenu}>
                            Analytics
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/reports" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={toggleMenu}>
                            Reports
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={toggleMenu}>
                            About
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
