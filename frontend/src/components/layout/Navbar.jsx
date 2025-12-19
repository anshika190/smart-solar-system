import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, LogOut, LogIn } from 'lucide-react';
import { AuthContext } from '../../auth/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        logout();
        navigate('/login');
        setIsOpen(false);
    };

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
                        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={toggleMenu}>
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
                        <NavLink to="/system-reports" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={toggleMenu}>
                            Reports
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={toggleMenu}>
                            About
                        </NavLink>
                    </li>

                    {/* Auth Action */}
                    <li className="nav-item auth-item">
                        {user ? (
                            <button onClick={handleLogout} className="nav-btn logout-btn">
                                <LogOut size={16} /> Logout
                            </button>
                        ) : (
                            <NavLink to="/login" className="nav-btn login-btn" onClick={toggleMenu}>
                                <LogIn size={16} /> Login
                            </NavLink>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
