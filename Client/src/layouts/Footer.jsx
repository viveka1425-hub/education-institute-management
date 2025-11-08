import React from "react";
import "./Footer.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";


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
        <div className="footer-section ml-20">
          <h4>Contact Us</h4>
          <p>Email: info@eduinst.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Address: Chennai, India</p>
        </div>

        {/* Column 4: Socials */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <Link to="#"><FaFacebookF /></Link>
            <Link to="#"><FaTwitter /></Link>
            <Link to="#"><FaInstagram /></Link>
            <Link to="#"><FaLinkedinIn /></Link>
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
