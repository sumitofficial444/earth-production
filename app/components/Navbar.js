'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Navbar.module.css';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Studio', href: '#studio' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navInner}`}>
        {/* Logo */}
        <a
          href="#home"
          className={styles.logo}
          onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
        >
          <Image src="/logo.webp" alt="The Earth Production Logo" width={60} height={60} className={styles.logoImg} />
          <div className={styles.logoText}>
            <span className={styles.logoMain}>The Earth</span>
            <span className={styles.logoSub}>Production</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <ul className={styles.navLinks}>
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={styles.navLink}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <a
          href="#contact"
          className={`btn-primary ${styles.ctaBtn}`}
          onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
        >
          Book Studio
          <span>→</span>
        </a>

        {/* Hamburger */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          id="nav-hamburger"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ''}`}>
        <ul>
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className={styles.mobileCtaBtn}
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
            >
              Book Studio
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
