'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';

const waveCount = 20;

export default function Hero() {
  const waveRef = useRef(null);

  useEffect(() => {
    // Stagger waveform bars
    if (waveRef.current) {
      const bars = waveRef.current.querySelectorAll(`.${styles.waveBar}`);
      bars.forEach((bar, i) => {
        bar.style.animationDelay = `${i * 0.08}s`;
        bar.style.animationDuration = `${0.6 + Math.random() * 0.8}s`;
      });
    }
  }, []);

  return (
    <section id="home" className={styles.hero}>
      {/* Background gradient blobs */}
      <div className={styles.bgBlob1} />
      <div className={styles.bgBlob2} />
      <div className={styles.bgGrid} />

      <div className={`container ${styles.heroContent}`}>
        <div className={styles.leftCol}>
          {/* Badge */}
          <div className="badge">
            <span className={styles.dot} />
            Now Accepting Bookings
          </div>

          {/* Heading */}
          <h1 className={styles.heroTitle}>
            Your Story Deserves{' '}
            <span className={`text-gold ${styles.highlight}`}>
              Professional Sound
            </span>
          </h1>

          {/* Subtext */}
          <p className={styles.heroSub}>
            The Earth Production — a premium podcast studio, video editing
            suite &amp; rental space built for creators, brands, and
            storytellers who refuse to settle for less.
          </p>

          {/* Waveform visualizer */}
          <div className={styles.waveform} ref={waveRef}>
            {Array.from({ length: waveCount }).map((_, i) => (
              <div key={i} className={styles.waveBar} />
            ))}
          </div>

          {/* CTA Buttons */}
          <div className={styles.ctaRow}>
            <a href="#contact" className="btn-primary" onClick={(e) => { e.preventDefault(); document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' }) }}>
              🎙️ Book a Session
            </a>
            <a href="#services" className="btn-outline" onClick={(e) => { e.preventDefault(); document.querySelector('#services').scrollIntoView({ behavior: 'smooth' }) }}>
              Explore Services
            </a>
          </div>

          {/* Trust pills */}
          <div className={styles.trustRow}>
            <div className={styles.trustPill}>🎧 Pro Equipment</div>
            <div className={styles.trustPill}>🎬 Video Editing</div>
            <div className={styles.trustPill}>📻 Podcast Ready</div>
          </div>
        </div>

        <div className={styles.rightCol}>
          {/* Studio card */}
          <div className={styles.studioCard}>
            <div className={styles.studioCardGlow} />
            <div className={styles.logoWrap}>
              <Image
                src="/logo.webp"
                alt="The Earth Production Logo"
                width={180}
                height={180}
                className={styles.heroLogo}
                priority
              />
            </div>
            <p className={styles.studioCardLabel}>The Earth Production</p>
            <p className={styles.studioCardTagline}>
              Rental Podcast &amp; Video Studio
            </p>

            {/* Floating stats */}
            <div className={`${styles.floatBadge} ${styles.floatBadge1}`}>
              <span className={styles.statNum}>500+</span>
              <span className={styles.statTxt}>Episodes Recorded</span>
            </div>
            <div className={`${styles.floatBadge} ${styles.floatBadge2}`}>
              <span className={styles.statNum}>4K</span>
              <span className={styles.statTxt}>Video Quality</span>
            </div>
            <div className={`${styles.floatBadge} ${styles.floatBadge3}`}>
              <span className={styles.statNum}>⭐ 5.0</span>
              <span className={styles.statTxt}>Client Rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollLine} />
        <span>Scroll</span>
      </div>
    </section>
  );
}
