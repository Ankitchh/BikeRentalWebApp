import React from 'react';
import { Link } from 'react-router-dom';
import { Bike, Facebook, Instagram, Twitter, Mail, Phone, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-neutral-800 text-white pt-12 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Bike className="w-7 h-7 text-primary-300" />
              <span className="ml-2 text-xl font-bold font-heading">BikeRental</span>
            </div>
            <p className="text-neutral-300 mb-4">
              Ride the city your way with our premium eco-friendly bike rentals.
            </p>
            <div className="flex space-x-4 mb-4">
              <SocialIcon icon={<Facebook />} href="https://facebook.com" />
              <SocialIcon icon={<Instagram />} href="https://instagram.com" />
              <SocialIcon icon={<Twitter />} href="https://twitter.com" />
            </div>
            <p className="text-neutral-400 text-sm mt-6">
              &copy; {currentYear} EcoRide. All rights reserved.
            </p>
          </div>
          
          {/* Quick Links 1 */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/accessories">Bikes</FooterLink>
              <FooterLink to="/">Pricing</FooterLink>
            </ul>
          </div>
          
          {/* Quick Links 2 */}
          <div>
            <h4 className="text-lg font-semibold mb-4">My Account</h4>
            <ul className="space-y-2">
              <FooterLink to="/">My Bookings</FooterLink>
              <FooterLink to="/profile">My Profile</FooterLink>
              <FooterLink to="/">Reviews</FooterLink>
              <FooterLink to="/">Contact</FooterLink>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="w-5 h-5 text-primary-300 mr-3 mt-0.5" />
                <a href="tel:+1234567890" className="text-neutral-300 hover:text-primary-300 transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start">
                <Mail className="w-5 h-5 text-primary-300 mr-3 mt-0.5" />
                <a href="mailto:info@ecoride.com" className="text-neutral-300 hover:text-primary-300 transition-colors">
                  info@ecoride.com
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-primary-300 mr-3 mt-0.5" />
                <a 
                  href="https://maps.google.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-300 hover:text-primary-300 transition-colors"
                >
                  123 Bike Street, EcoCity, EC 12345
                </a>
              </li>
              <li className="flex items-start">
                <Clock className="w-5 h-5 text-primary-300 mr-3 mt-0.5" />
                <span className="text-neutral-300">
                  Mon-Fri: 9am-6pm<br />
                  Sat-Sun: 10am-4pm
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter Form */}
        {/* <div className="mt-12 pt-8 border-t border-neutral-700">
          <div className="max-w-xl mx-auto text-center">
            <h4 className="text-xl font-semibold mb-3">Subscribe to Our Newsletter</h4>
            <p className="text-neutral-300 mb-4">
              Get the latest updates on new bikes, promotions, and cycling tips.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-lg bg-neutral-700 text-white border border-neutral-600 focus:border-primary-300 focus:ring-2 focus:ring-primary-300/20 outline-none transition-all"
              />
              <button type="submit" className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div> */}
        
        {/* Bottom Footer */}
        <div className="mt-12 pt-6 border-t border-neutral-700 text-neutral-400 text-sm flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="mr-4 hover:text-primary-300 transition-colors">Terms of Service</Link>
            <Link to="/" className="mr-4 hover:text-primary-300 transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-primary-300 transition-colors">Sitemap</Link>
          </div>
          <div>
            <p>Designed with 💚 for all Travelers</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Footer link component
const FooterLink = ({ to, children }) => (
  <li>
    <Link 
      to={to}
      className="text-neutral-300 hover:text-primary-300 transition-colors duration-200"
    >
      {children}
    </Link>
  </li>
);

// Social icon component
const SocialIcon = ({ icon, href }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-neutral-700 hover:bg-primary-600 text-white p-2 rounded-full transition-colors"
  >
    {icon}
  </a>
);

export default Footer;