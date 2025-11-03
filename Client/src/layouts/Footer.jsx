import React from "react";
import "./Footer.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {

  const Role = localStorage.getItem("role");
  return (
    <div>
  {Role == "user" && (
    <div>
    <footer className="footer">
      <div className="footer-container">

        {/* Column 1: About */}
        <div className="footer-section">
          <h3>Education Institute</h3>
          <p>
            Empowering students with knowledge and skills for a brighter future.
            Join us to experience world-class education with modern learning techniques.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-section">
          <h4>Page List</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">courses</a></li>
            <li><a href="/courses">facilities</a></li>
            <li><a href="/contact">review</a></li>
            <li><a href = "/enquiry">Enquiry</a></li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: info@eduinst.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Address: Chennai, India</p>
        </div>

        {/* Column 4: Socials */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Education Institute | All Rights Reserved</p>
      </div>
    </footer>
    </div>
  )}
  </div>
  );
};

export default Footer;
