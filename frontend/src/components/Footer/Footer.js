import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faYoutube,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer contain">
      <div className="social-icons">
        <FontAwesomeIcon icon={faFacebook} className='icon' />
        <FontAwesomeIcon icon={faTwitter} className='icon' />
        <FontAwesomeIcon icon={faInstagram} className='icon' />
        <FontAwesomeIcon icon={faYoutube} className='icon' />
        <FontAwesomeIcon icon={faWhatsapp} className='icon' />
      </div>
      <div className="footer-line">
        <ul>
          <p><Link to={`/`}>Reach Us</Link></p>
          <p><Link to={`/`}>Blog</Link></p>
          <p><Link to={`/`}>Store Locator</Link></p>
          <p><Link to={`/`}>FAQ</Link></p>
          <p><Link to={`/`}>Privacy Policy</Link></p>
          <p><Link to={`/`}>Terms and Conditions</Link></p>
        </ul>
      </div>

      <div className="footer-line contact-info">
        <p>Copyright 2023, Dairy-2-Door</p>
      </div>
    </footer>
  );
};

export default Footer;