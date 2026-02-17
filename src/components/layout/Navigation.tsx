import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import classNames from 'classnames';
import './Navigation.css';

interface NavigationProps {
    // Add any specific props if needed
}

export const Navigation: React.FC<NavigationProps> = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/saved', label: 'Saved' },
        { path: '/digest', label: 'Digest' },
        { path: '/settings', label: 'Settings' },
        { path: '/proof', label: 'Proof' },
    ];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navigation">
            <div className="nav-container">
                <Link to="/" className="nav-logo">
                    Job Notification Tracker
                </Link>

                {/* Desktop Navigation */}
                <div className="nav-links-desktop">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={classNames('nav-link', {
                                'nav-link--active': location.pathname === link.path,
                            })}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Toggle */}
                <button className="nav-menu-toggle" onClick={toggleMenu}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Navigation */}
                <div className={classNames('nav-links-mobile', { 'nav-links-mobile--open': isMenuOpen })}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={classNames('nav-link-mobile', {
                                'nav-link-mobile--active': location.pathname === link.path,
                            })}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};
