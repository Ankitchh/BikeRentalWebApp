import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { Bike, Menu, X, User, LogOut } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const loginHandler = async () => {
    setloading(true);
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  const logoutHandler = () => {
    logout();
  };

  // Close mobile menu when navigating
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Change header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerClass = isScrolled
    ? "bg-white shadow-md py-3"
    : "bg-transparent py-5 ";

  const logoTextClass = isScrolled ? "text-primary-600" : "text-slate-500";

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
    // Close mobile menu if open when profile menu is toggled
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <header
          className={`fixed w-full z-50 transition-all duration-300  ${headerClass}`}
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link to="/" className="flex items-center ">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center"
                >
                  <Bike className={`w-8 h-8 ${logoTextClass}`} />
                  <span
                    className={`ml-2 text-xl font-bold font-heading ${logoTextClass}`}
                  >
                    BikeRental
                  </span>
                </motion.div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-8 text-slate-500">
                <NavLink to="/" isScrolled={isScrolled}>
                  Home
                </NavLink>
                <NavLink to="/about" isScrolled={isScrolled}>
                  About Us
                </NavLink>
                <NavLink to="/accessories" isScrolled={isScrolled}>
                  Accessories
                </NavLink>
                {user ? (
                  <div className="relative">
                    <button
                      onClick={toggleProfileMenu}
                      className="flex items-center focus:outline-none"
                    >
                      <img
                        src={user.profilePic}
                        alt={user.fullName}
                        className="w-8 h-8 rounded-full object-cover border-2 border-primary-300"
                      />
                      <span
                        className={`ml-2 ${
                          isScrolled ? "text-neutral-700" : "text-slate-500"
                        }`}
                      >
                        {user.fullName.split(" ")[0]}
                      </span>
                    </button>

                    <AnimatePresence>
                      {profileMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
                        >
                          <Link
                            to="/profile"
                            className="block px-4 py-2 text-neutral-700 hover:bg-primary-50"
                          >
                            <div className="flex items-center">
                              <User className="w-4 h-4 mr-2" />
                              Profile
                            </div>
                          </Link>
                          <button
                            onClick={logoutHandler}
                            className="block w-full text-left px-4 py-2 text-neutral-700 hover:bg-primary-50"
                          >
                            <div className="flex items-center">
                              <LogOut className="w-4 h-4 mr-2" />
                              Logout
                            </div>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <button
                    onClick={loginHandler}
                    className={`btn ${
                      isScrolled
                        ? "btn-primary"
                        : "btn-outline border-white text-white hover:bg-white hover:text-primary-600"
                    }`}
                  >
                    Sign In
                  </button>
                )}
              </nav>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center">
                {user && (
                  <img
                    src={user.profilePic}
                    alt={user.fullName}
                    onClick={toggleProfileMenu}
                    className="w-8 h-8 rounded-full object-cover border-2 border-primary-300 mr-4 cursor-pointer"
                  />
                )}
                <button
                  onClick={toggleMobileMenu}
                  className={`p-2 rounded-lg focus:outline-none ${
                    isScrolled ? "text-neutral-800" : "text-gray-700"
                  }`}
                >
                  {mobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-white"
              >
                <div className="container mx-auto px-4 py-4">
                  <div className="flex flex-col space-y-3">
                    <MobileNavLink to="/" onClick={toggleMobileMenu}>
                      Home
                    </MobileNavLink>
                    <MobileNavLink to="/about" onClick={toggleMobileMenu}>
                      About Us
                    </MobileNavLink>
                    <MobileNavLink to="/accessories" onClick={toggleMobileMenu}>
                      Accessories
                    </MobileNavLink>
                    {!user ? (
                      <button
                        onClick={() => {
                          loginHandler();
                          toggleMobileMenu();
                        }}
                        className="btn btn-primary w-full mt-2"
                      >
                        Sign In
                      </button>
                    ) : (
                      <>
                        <MobileNavLink to="/profile" onClick={toggleMobileMenu}>
                          Profile
                        </MobileNavLink>
                        <button
                          onClick={logout}
                          className="flex items-center py-2 text-neutral-700"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Logout
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Profile Menu */}
          <AnimatePresence>
            {profileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-white"
              >
                <div className="container mx-auto px-4 py-4">
                  <div className="flex flex-col space-y-3">
                    <MobileNavLink to="/profile" onClick={toggleProfileMenu}>
                      Profile
                    </MobileNavLink>
                    <button
                      onClick={() => {
                        toggleProfileMenu();
                        logout();
                      }}
                      className="flex items-center py-2 text-neutral-700"
                    >
                      <LogOut
                        onClick={logoutHandler}
                        className="w-4 h-4 mr-2"
                      />
                      Logout
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>
      )}
    </>
  );
};

// Desktop Nav Link Component
const NavLink = ({ to, children, isScrolled }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const baseClasses =
    "relative font-medium text-base py-2 transition-colors duration-200";
  const textColorClass = isScrolled
    ? isActive
      ? "text-primary-600"
      : "text-neutral-700 hover:text-primary-600"
    : isActive
    ? "text-slate-500"
    : "text-slate-500/80 hover:text-slate-500";

  return (
    <Link to={to} className={`${baseClasses} ${textColorClass}`}>
      {children}
      {isActive && (
        <motion.div
          layoutId="activeNavIndicator"
          className={`absolute bottom-0 left-0 w-full h-0.5 ${
            isScrolled ? "bg-primary-600" : "bg-white"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </Link>
  );
};

// Mobile Nav Link Component
const MobileNavLink = ({ to, onClick, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`py-2 ${
        isActive ? "text-primary-600 font-medium" : "text-neutral-700"
      }`}
    >
      {children}
    </Link>
  );
};

export default Header;
