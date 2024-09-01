'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaHome, FaInfoCircle, FaPhoneAlt, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`fixed w-full top-0 left-0 bgw z-50 transition-shadow ${isSticky ? 'bg-white shadow-md' : 'bg-white'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link href="/">Sistem Pengaduan</Link>
        </div>
        <button
          className="block lg:hidden px-4 py-2"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
        <div
          className={`lg:flex lg:items-center lg:space-x-6 ${isOpen ? 'block' : 'hidden'}`}
        >
          <Link href="/" className="flex items-center space-x-2">
            <FaHome />
            <span>Home</span>
          </Link>
          <Link href="/services" className="flex items-center space-x-2">
            <FaInfoCircle />
            <span>Layanan</span>
          </Link>
          <Link href="/faq" className="flex items-center space-x-2">
            <FaInfoCircle />
            <span>FAQ</span>
          </Link>
          <Link href="/contact" className="flex items-center space-x-2">
            <FaPhoneAlt />
            <span>Kontak</span>
          </Link>
          {/* Conditional rendering for different users */}
          {/* Replace `isUserLoggedIn` with actual authentication check */}
          {false ? (
            <>
              <Link href="/profile" className="flex items-center space-x-2">
                <FaUser />
                <span>Profil</span>
              </Link>
              <Link href="/logout" className="flex items-center space-x-2">
                <FaSignOutAlt />
                <span>Logout</span>
              </Link>
            </>
          ) : (
            <>
              {/* <Link href="/login" className="flex items-center space-x-2">
                <FaSignInAlt />
                <span>Login</span>
              </Link> */}
              <Link href="/register" className="flex items-center space-x-2">
                <FaSignInAlt />
                <span>Register</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
