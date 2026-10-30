'use client';
import styles from './Studio.module.css';

const features = [
  { icon: '🎤', title: 'Pro-grade Microphones', desc: 'Shure SM7B, Rode NT1, and condenser mics for every voice type.' },
  { icon: '🎛️', title: 'Advanced Mixing Console', desc: 'SSL-grade mixing desk with real-time EQ and compression.' },
  { icon: '📷', title: '4K Camera Rigs', desc: 'Sony FX6 and BMPCC 6K rigs for cinematic podcast visuals.' },
  { icon: '💡', title: 'Studio Lighting', desc: 'Aputure & Godox LED panels — perfectly lit every time.' },
  { icon: '🔇', title: 'Soundproofed Rooms', desc: 'Acoustic panels, bass traps, and diffusers for zero bleed.' },
  { icon: '🖥️', title: 'Editing Workstations', desc: 'Apple Mac Studio & Davinci Resolve / Premiere Pro rigs.' },
];

export default function Studio() {
  return (
    <section id="studio" className={`section-gap ${styles.studio}`}>
      <div className="container">
        <div className={styles.grid}>
          {/* Left: text */}
          <div className={styles.leftCol}>
            <div className="badge">🏠 The Studio</div>
            <h2 className={`section-title ${styles.title}`}>
              A Space Built for{' '}
              <span className="text-gold">Serious Creators</span>
            </h2>
            <p className={styles.desc}>
              Our studio isn&apos;t just a room — it&apos;s an environment engineered
              for creativity. From acoustic design to top-of-the-line gear,
              every detail is calibrated so you can focus on what matters:
              your content.
            </p>
            <div className={styles.featureList}>
              {features.map((f, i) => (
                <div key={i} className={styles.featureItem}>
                  <span className={styles.featureIcon}>{f.icon}</span>
                  <div>
                    <p className={styles.featureTitle}>{f.title}</p>
                    <p className={styles.featureDesc}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <a
              href="#contact"
              className="btn-primary"
              style={{ marginTop: '16px', display: 'inline-flex' }}
              onClick={(e) => { e.preventDefault(); document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' }); }}
            >
              🎙️ Book a Tour
            </a>
          </div>

          {/* Right: visual */}
          <div className={styles.rightCol}>
            <div className={styles.studioVisual}>
              <div className={styles.visualGlow} />
              {/* Simulated studio console UI */}
              <div className={styles.consoleMock}>
                <div className={styles.consoleHeader}>
                  <div className={styles.dot} style={{ background: '#ff5f57' }} />
                  <div className={styles.dot} style={{ background: '#ffbd2e' }} />
                  <div className={styles.dot} style={{ background: '#28c840' }} />
                  <span className={styles.consoleName}>The Earth Production — Session Live</span>
                </div>
                <div className={styles.waveformBig}>
                  {Array.from({ length: 60 }).map((_, i) => (
                    <div
                      key={i}
                      className={styles.wBig}
                      style={{
                        animationDelay: `${i * 0.06}s`,
                        animationDuration: `${0.5 + (i % 7) * 0.15}s`,
                      }}
                    />
                  ))}
                </div>
                <div className={styles.consoleControls}>
                  <div className={styles.ctrlKnob} />
                  <div className={styles.ctrlKnob} />
                  <div className={styles.ctrlKnob} />
                  <div className={`${styles.ctrlKnob} ${styles.active}`} />
                  <div className={styles.ctrlKnob} />
                </div>
                <div className={styles.channelStrips}>
                  {['MIC 1', 'MIC 2', 'BGM', 'SFX', 'MAIN'].map((ch, i) => (
                    <div key={ch} className={styles.strip}>
                      <div className={styles.stripFader} style={{ height: `${30 + i * 12}%` }} />
                      <span className={styles.stripLabel}>{ch}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.liveTag}>● REC</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
