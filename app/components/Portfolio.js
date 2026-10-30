import styles from './Portfolio.module.css';

const projects = [
  {
    category: 'Podcast',
    title: 'The Founder\'s Mic',
    desc: 'A weekly startup founders podcast — 40+ episodes produced, reaching 15K monthly listeners.',
    tags: ['Audio Production', 'Editing', 'Distribution'],
    metric: '15K listeners',
    emoji: '🎙️',
  },
  {
    category: 'Video Editing',
    title: 'Brand Story Film',
    desc: 'A cinematic brand documentary edited with motion graphics, color grade, and original music.',
    tags: ['4K Editing', 'Color Grade', 'Motion Graphics'],
    metric: '2M views',
    emoji: '🎬',
  },
  {
    category: 'Studio Rental',
    title: 'TedX Indore Session',
    desc: 'Full studio rental + multi-camera recording for a local TedX event with 6 speakers.',
    tags: ['Multi-cam', 'Live Recording', 'Post-production'],
    metric: '6 speakers',
    emoji: '🎤',
  },
  {
    category: 'Social Clips',
    title: 'Viral Short-Form Series',
    desc: 'Transformed 8 long-form podcast episodes into 60 viral clips — 3.5M combined views.',
    tags: ['Reels', 'Shorts', 'Captions'],
    metric: '3.5M views',
    emoji: '📱',
  },
  {
    category: 'Audio Mastering',
    title: 'Indie Music Album',
    desc: 'Mixed and mastered a 12-track independent album now streaming across all major platforms.',
    tags: ['Mixing', 'Mastering', 'Distribution'],
    metric: '12 tracks',
    emoji: '🎚️',
  },
  {
    category: 'Podcast',
    title: 'The Health Decoded Show',
    desc: 'Monthly health & wellness podcast — full production from recording to final export.',
    tags: ['Recording', 'Editing', 'Thumbnails'],
    metric: '8K subscribers',
    emoji: '💪',
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className={`section-gap ${styles.portfolio}`}>
      <div className="container">
        <div className={`text-center ${styles.header}`}>
          <div className="badge">✦ Our Work</div>
          <h2 className={`section-title ${styles.title}`}>
            Stories We&apos;ve Helped{' '}
            <span className="text-gold">Come Alive</span>
          </h2>
          <p className={`section-subtitle ${styles.subtitle}`}>
            From indie podcasters to established brands — here&apos;s a glimpse of
            what we&apos;ve produced at The Earth Production.
          </p>
        </div>

        <div className={styles.grid}>
          {projects.map((p, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.emoji}>{p.emoji}</span>
                <span className={styles.category}>{p.category}</span>
                <span className={styles.metric}>{p.metric}</span>
              </div>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardDesc}>{p.desc}</p>
              <div className={styles.tagRow}>
                {p.tags.map((t) => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
