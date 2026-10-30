'use client';
import { useState } from 'react';
import styles from './Contact.module.css';

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', service: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className={`section-gap ${styles.contact}`}>
      <div className="container">
        <div className={styles.grid}>
          {/* Left Info */}
          <div className={styles.leftCol}>
            <div className="badge">📞 Get In Touch</div>
            <h2 className={`section-title ${styles.title}`}>
              Ready to{' '}
              <span className="text-gold">Start Recording?</span>
            </h2>
            <p className={styles.desc}>
              Whether you&apos;re launching your first podcast or scaling your
              video content — we&apos;re here to make it happen. Reach out and
              let&apos;s build something incredible together.
            </p>

            <div className={styles.infoCards}>
              <div className={styles.infoCard}>
                <span className={styles.infoIcon}>📍</span>
                <div>
                  <p className={styles.infoLabel}>Location</p>
                  <p className={styles.infoVal}>Indore, Madhya Pradesh, India</p>
                </div>
              </div>
              <div className={styles.infoCard}>
                <span className={styles.infoIcon}>📱</span>
                <div>
                  <p className={styles.infoLabel}>Phone / WhatsApp</p>
                  <a href="tel:+917049407951" className={styles.infoVal}>+91 70494 07951</a>
                </div>
              </div>
              <div className={styles.infoCard}>
                <span className={styles.infoIcon}>📧</span>
                <div>
                  <p className={styles.infoLabel}>Email</p>
                  <a href="mailto:hello@theearthproduction.com" className={styles.infoVal}>
                    hello@theearthproduction.com
                  </a>
                </div>
              </div>
              <div className={styles.infoCard}>
                <span className={styles.infoIcon}>🕐</span>
                <div>
                  <p className={styles.infoLabel}>Studio Hours</p>
                  <p className={styles.infoVal}>Mon–Sat: 9AM – 10PM</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className={styles.socialRow}>
              <a href="#" className={styles.socialBtn} aria-label="Instagram">📸 Instagram</a>
              <a href="#" className={styles.socialBtn} aria-label="YouTube">▶️ YouTube</a>
              <a href="#" className={styles.socialBtn} aria-label="WhatsApp">💬 WhatsApp</a>
            </div>
          </div>

          {/* Right: Form */}
          <div className={styles.rightCol}>
            {submitted ? (
              <div className={styles.successBox}>
                <div className={styles.successIcon}>🎉</div>
                <h3>Booking Request Sent!</h3>
                <p>We&apos;ll get back to you within 24 hours to confirm your session details.</p>
                <button className="btn-primary" onClick={() => setSubmitted(false)}>
                  Send Another
                </button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} id="booking-form">
                <h3 className={styles.formTitle}>Book a Session</h3>
                <p className={styles.formSub}>Fill in your details and we&apos;ll confirm your slot within 24 hours.</p>

                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <label htmlFor="name">Full Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your full name"
                      required
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <label htmlFor="phone">Phone / WhatsApp</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 00000 00000"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="service">Service Needed</label>
                    <select
                      id="service"
                      name="service"
                      required
                      value={form.service}
                      onChange={handleChange}
                    >
                      <option value="">Select a service…</option>
                      <option>Podcast Recording</option>
                      <option>Video Editing</option>
                      <option>Studio Rental</option>
                      <option>Social Media Clips</option>
                      <option>Audio Post-Production</option>
                      <option>Content Photography</option>
                    </select>
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="message">Tell us about your project</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Describe your project, date preferences, number of people…"
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className={`btn-primary ${styles.submitBtn}`}>
                  🎙️ Send Booking Request
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
