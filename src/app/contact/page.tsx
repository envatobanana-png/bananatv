'use client';
import React, { useRef, useState } from 'react';
import { FaEnvelope, FaPaperPlane, FaHandshake, FaMapMarkerAlt, FaQuestionCircle } from 'react-icons/fa';
import styles from './contact.module.scss';
import toast from 'react-hot-toast';
import { sendContactEmail } from '../action';

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  // Xử lý gửi form giả lập
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    // Gọi Server Action
    const result = await sendContactEmail(formData);

    if (result.success) {
      toast.success("Message sent! We'll get back to you soon. 🚀");
      formRef.current?.reset(); // Xóa trắng form sau khi gửi
    } else {
      toast.error(`Failed: ${result.error}`);
    }

    setIsLoading(false);
  };
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
          
          <form ref={formRef} onSubmit={handleSubmit}>
            {/* Grid tên và email */}
            <div className={styles.formGrid}>
              <div className={styles.field}>
                <label>Your Name</label>
                <input type="text" name="name" placeholder="Adventurer Name" required />
              </div>
              <div className={styles.field}>
                <label>Your Email</label>
                <input type="email" name="email" placeholder="email@example.com" required />
              </div>
            </div>

            {/* Select Subject */}
            <div className={styles.field} style={{ marginBottom: '1.5rem' }}>
              <label>Topic</label>
              <select name="interest" defaultValue="">
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
              <textarea name="message" placeholder="Tell me about your project or ask me anything..." required></textarea>
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