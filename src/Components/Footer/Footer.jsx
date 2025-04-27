import React from "react";
import {
  FaTools,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
      <aside className="space-y-2">
        <div className="flex items-center gap-2 text-primary font-bold text-lg">
          <FaTools className="w-6 h-6" />
          <span>MobileMend</span>
        </div>
        <p className="text-sm">
          Fast, Reliable Onsite Mobile Repair Services.
          <br />
          Serving You at Your Doorstep!
        </p>
        <div className="flex items-center gap-2 text-sm">
          <FaPhoneAlt />
          <span>+1 234 567 890</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <FaEnvelope />
          <span>support@mobilemend.com</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <FaMapMarkerAlt />
          <span>123 Main Street, City, Country</span>
        </div>
      </aside>

      <nav>
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">Screen Replacement</a>
        <a className="link link-hover">Battery Replacement</a>
        <a className="link link-hover">Camera Repair</a>
        <a className="link link-hover">Charging Port Fix</a>
      </nav>

      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About Us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Technician Login</a>
        <a className="link link-hover">Become a Technician</a>
      </nav>

      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms & Conditions</a>
        <a className="link link-hover">Privacy Policy</a>
        <a className="link link-hover">Refund Policy</a>
      </nav>
    </footer>
  );
};

export default Footer;
