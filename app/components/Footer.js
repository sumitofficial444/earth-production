
import Image from 'next/image';
import styles from './Footer.module.css';

const links = {
  Services: ['Podcast Recording', 'Video Editing', 'Studio Rental', 'Social Clips', 'Audio Mastering', 'Photography'],
  Company: ['About Us', 'Portfolio', 'Careers', 'Blog', 'Press Kit'],
  Legal: ['Privacy Policy', 'Terms of Use', 'Cookie Policy'],
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.topLine} />
      <div className="container">
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logoRow}>
              <Image src="/logo.jpg" alt="The Earth Production" width={56} height={56} className={styles.logoImg} />
              <div>
                <p className={styles.logoMain}>The Earth Production</p>
                <p className={styles.logoSub}>Rental Podcast & Video Studio</p>
              </div>
            </div>
            <p className={styles.brandDesc}>
              Indore&apos;s premier podcast studio and video production space.
              Built for creators who are serious about their craft.
            </p>
            <div className={styles.socialIcons}>
              <a href="#" aria-label="Instagram" className={styles.socialIcon}>📸</a>
              <a href="#" aria-label="YouTube" className={styles.socialIcon}>▶️</a>
              <a href="#" aria-label="WhatsApp" className={styles.socialIcon}>💬</a>
              <a href="#" aria-label="LinkedIn" className={styles.socialIcon}>💼</a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section} className={styles.linkCol}>
              <p className={styles.colHeading}>{section}</p>
              <ul>
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className={styles.link}>{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.bottomBar}>
          <p className={styles.copy}>
            © 2025 The Earth Production. All rights reserved.
          </p>
          <p className={styles.madeWith}>
            Built with ❤️ in Indore, India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
}
