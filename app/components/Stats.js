import styles from './Stats.module.css';

const stats = [
  { value: '500+', label: 'Episodes Recorded', icon: '🎙️' },
  { value: '200+', label: 'Happy Clients', icon: '🤝' },
  { value: '4K', label: 'Video Quality', icon: '🎬' },
  { value: '98%', label: 'Client Satisfaction', icon: '⭐' },
];

const marqueeItems = [
  'Podcast Recording',
  'Video Editing',
  'Studio Rental',
  'Audio Mastering',
  'Social Clips',
  'Brand Photography',
  'Color Grading',
  'Sound Design',
];

export default function Stats() {
  return (
    <section className={styles.statsSection}>
      {/* Marquee ticker */}
      <div className={styles.marqueeWrap}>
        <div className={styles.marqueeTrack}>
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className={styles.marqueeItem}>
              <span className={styles.marqueeDot}>✦</span> {item}
            </span>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="container">
        <div className={styles.statsGrid}>
          {stats.map((stat, i) => (
            <div key={i} className={styles.statCard}>
              <div className={styles.statIcon}>{stat.icon}</div>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
