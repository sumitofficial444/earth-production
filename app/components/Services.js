import styles from './Services.module.css';

const services = [
  {
    icon: '🎙️',
    title: 'Podcast Recording',
    desc: 'State-of-the-art soundproofed rooms with professional microphones, mixers, and acoustic treatment for crystal-clear audio.',
    tags: ['Multi-mic setup', 'Live monitoring', 'Noise cancellation'],
  },
  {
    icon: '🎬',
    title: 'Video Editing',
    desc: 'Full-service video post-production including color grading, motion graphics, sound design, and professional export for all platforms.',
    tags: ['4K editing', 'Color grading', 'Motion graphics'],
  },
  {
    icon: '🏠',
    title: 'Studio Rental',
    desc: 'Rent our premium podcast and video studio by the hour or day. Equipped with everything you need — just bring your creativity.',
    tags: ['Hourly / Daily', 'Full equipment', 'Tech support'],
  },
  {
    icon: '📱',
    title: 'Social Media Clips',
    desc: 'We cut your podcast into viral short-form clips optimized for Instagram Reels, YouTube Shorts, and TikTok to maximize reach.',
    tags: ['Reels & Shorts', 'Subtitles', 'Branded templates'],
  },
  {
    icon: '🎚️',
    title: 'Audio Post-Production',
    desc: 'Professional audio mixing, mastering, noise removal, and EQ processing so your podcast sounds broadcast-quality.',
    tags: ['Mixing & mastering', 'Noise removal', 'EQ & compression'],
  },
  {
    icon: '📸',
    title: 'Content Photography',
    desc: 'On-site professional photography for your podcast thumbnails, brand kit, press photos, and social media content.',
    tags: ['Studio lighting', 'Brand photography', 'Thumbnails'],
  },
];

export default function Services() {
  return (
    <section id="services" className={`section-gap ${styles.services}`}>
      <div className="container">
        {/* Header */}
        <div className={`text-center ${styles.header}`}>
          <div className="badge">🎧 What We Offer</div>
          <h2 className={`section-title ${styles.title}`}>
            Everything You Need to{' '}
            <span className="text-gold">Create & Grow</span>
          </h2>
          <p className={`section-subtitle ${styles.subtitle}`}>
            From recording your first episode to editing a full video series —
            The Earth Production has you covered end-to-end.
          </p>
        </div>

        {/* Services Grid */}
        <div className={styles.grid}>
          {services.map((svc, i) => (
            <div key={i} className={`card ${styles.card}`}>
              <div className={styles.cardGlow} />
              <div className={styles.iconWrap}>{svc.icon}</div>
              <h3 className={styles.cardTitle}>{svc.title}</h3>
              <p className={styles.cardDesc}>{svc.desc}</p>
              <div className={styles.tagRow}>
                {svc.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
