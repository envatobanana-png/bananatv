import React from 'react';
import { FaEnvelope, FaPaperPlane, FaHandshake, FaMapMarkerAlt, FaQuestionCircle } from 'react-icons/fa';
import styles from './contact.module.scss';

export default function ContactPage() {
  return (
    <main className={styles.container}>
      
      <header className={styles.header}>
        <h1>Get In <span>Touch</span></h1>
        <p>Got a question about a destination? Want to collaborate on a video? Or just want to say hi? Drop me a line below!</p>
      </header>

      <div className={styles.contentWrapper}>
        
        {/* --- LEFT SIDE: INFO --- */}
        <div className={styles.infoColumn}>
          
          {/* Card 1: Business */}
          <div className={styles.infoCard}>
            <FaHandshake className={styles.icon} />
            <h3>Business & Collabs</h3>
            <p>For sponsorships and partnership inquiries:</p>
            <a href="mailto:booking@bananaplanet.tv" className={styles.link}>booking@bananaplanet.tv</a>
          </div>

          {/* Card 2: General */}
          <div className={styles.infoCard}>
            <FaQuestionCircle className={styles.icon} />
            <h3>General Questions</h3>
            <p>For travel tips or just to chat:</p>
            <a href="mailto:hello@bananaplanet.tv" className={styles.link}>hello@bananaplanet.tv</a>
          </div>

          {/* Card 3: Location (Optional) */}
          <div className={styles.infoCard}>
            <FaMapMarkerAlt className={styles.icon} />
            <h3>Current Location</h3>
            <p>I'm currently exploring:</p>
            <span className="text-yellow-400 font-bold text-lg uppercase tracking-wider">
              📍 Northern Vietnam
            </span>
          </div>

        </div>

        {/* --- RIGHT SIDE: FORM --- */}
        <div className={styles.formCard}>
          <h2><FaPaperPlane className="text-yellow-400" /> Send a Postcard</h2>
          
          <form>
            {/* Grid tên và email */}
            <div className={styles.formGrid}>
              <div className={styles.field}>
                <label>Your Name</label>
                <input type="text" placeholder="Adventurer Name" required />
              </div>
              <div className={styles.field}>
                <label>Your Email</label>
                <input type="email" placeholder="email@example.com" required />
              </div>
            </div>

            {/* Select Subject */}
            <div className={styles.field} style={{ marginBottom: '1.5rem' }}>
              <label>Topic</label>
              <select defaultValue="">
                <option value="" disabled>What is this about?</option>
                <option value="collab">Business / Collaboration</option>
                <option value="question">Travel Question</option>
                <option value="feedback">Feedback</option>
                <option value="other">Just saying Hi!</option>
              </select>
            </div>

            {/* Message */}
            <div className={styles.field} style={{ marginBottom: '2rem' }}>
              <label>Message</label>
              <textarea placeholder="Tell me about your project or ask me anything..." required></textarea>
            </div>

            {/* Submit Button */}
            <button type="submit" className={styles.submitBtn}>
              Send Message <FaPaperPlane />
            </button>

          </form>
        </div>

      </div>
    </main>
  );
}