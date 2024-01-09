import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="py-5">
        <div className="container-xxl">
          <div className="row align-items-center ">
            <div className="col-5">
              <div className="footer-top-data d-flex gap-30 align-items-center ">
                <img src="images/newsletter.png" alt="newsletter" />
                <h2 className="mb-0 text-white ">Sign up for newsletter</h2>
              </div>
            </div>
            <div className="col-7">
              <div class="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your email address"
                  aria-label="Your email address"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-3 " id="basic-addon2">
                  Subscribe
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-4">
              <h4 className="text-white mb-4">Contact Us</h4>
              <div className="footer-links d-flex flex-column ">
                <Link className="text-white py-2 mb-1">
                  <span>Demo store: </span> <br /> Kathmandu, Nepal
                </Link>
                <a href="tel: +977 9843432300" className="text-white">
                  +977 9843432300
                </a>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Information</h4>
              <div className="footer-links d-flex flex-column ">
                <Link className="text-white py-2 mb-1">Privacy and Policy</Link>
                <Link className="text-white py-2 mb-1">Terms</Link>
                <Link className="text-white py-2 mb-1">Refund</Link>
                <Link className="text-white py-2 mb-1">Shipping</Link>
                <Link className="text-white py-2 mb-1">Blogs</Link>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Account</h4>
              <div className="footer-links d-flex flex-column ">
                <Link className="text-white py-2 mb-1">About Us</Link>
                <Link className="text-white py-2 mb-1">About Us</Link>

                <Link className="text-white py-2 mb-1">FAQ</Link>
                <Link className="text-white py-2 mb-1">Contact</Link>
              </div>
            </div>
            <div className="col-2">
              <h4 className="text-white mb-4">Quick Links</h4>
              <div className="footer-links d-flex flex-column ">
                <Link className="text-white py-2 mb-1">Laptops</Link>
                <Link className="text-white py-2 mb-1">Headphones</Link>
                <Link className="text-white py-2 mb-1">Tablets</Link>
                <Link className="text-white py-2 mb-1">Watches</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-white">
                &copy; Ashish Sigdel {new Date().getFullYear()} :- All right
                reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
