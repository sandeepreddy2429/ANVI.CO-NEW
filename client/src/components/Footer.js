import React from 'react';
import { Link } from 'react-router-dom';
import { FaBolt, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <FaBolt className="logo-icon" />
              <span>EnergyPro</span>
            </div>
            <p className="footer-description">
              Leading the future of sustainable energy solutions with innovative 
              technology and expert consulting services.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="#" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Services</h3>
            <ul className="footer-links">
              <li><a href="#solar">Solar Energy</a></li>
              <li><a href="#wind">Wind Power</a></li>
              <li><a href="#consulting">Energy Consulting</a></li>
              <li><a href="#maintenance">Maintenance</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact Info</h3>
            <div className="contact-info">
              <div className="contact-item">
                <FaMapMarkerAlt />
                <span>123 Energy Street, Green City, GC 12345</span>
              </div>
              <div className="contact-item">
                <FaPhone />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <FaEnvelope />
                <span>info@energypro.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} EnergyPro. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;