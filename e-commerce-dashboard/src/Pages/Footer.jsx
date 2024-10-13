import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          {/* Trending Now Section */}
          <div className="col-md-4 mb-2">
            <h5 className="text-uppercase mb-4">Trending Now</h5>
            <ul className="list-unstyled">
              <li><Link to="/ " className="text-white">Latest Trends</Link></li>
              <li><Link to="/ " className="text-white">Best Sellers</Link></li>
              <li><Link to="/ " className="text-white">Upcoming Releases</Link></li>
              <li><Link to="/ " className="text-white">Exclusive Offers</Link></li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div className="col-md-4 mb-2 text-center">
            <h5 className="text-uppercase mb-4">Follow Us</h5>
            <div className="d-flex justify-content-center">
              <a href="https://github.com/lovely-PRAKASH" className="text-white mx-2">
                <FaGithub size={24} />
              </a>
              <a href="https://www.twitter.com" className="text-white mx-2">
                <FaTwitter size={24} />
              </a>
              <a href="https://www.instagram.com" className="text-white mx-2">
                <FaInstagram size={24} />
              </a>
              <a href="https://www.linkedin.com/in/prakash-arthanarisamy-2a1323204/" className="text-white mx-2">
                <FaLinkedinIn size={24} />
              </a>
            </div>
          </div>

          {/* Contact Us Section */}
          <div className="col-md-4 mb-2">
            <h5 className="text-uppercase mb-4">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="text-white">Email: support@GoCart.com</li>
              <li className="text-white">Phone: +123 456 7890</li>
              <li className="text-white">Address: 123, Main Street, City</li>
            </ul>
          </div>
        </div>

        {/* Footer Copyright */}
        <div className="text-center mt-4">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} GoCart Pvt. Ltd., All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
