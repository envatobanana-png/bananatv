import React from 'react';
import Image from 'next/image';
import { FaYoutube, FaInstagram, FaTiktok, FaEnvelope, FaCamera, FaPlane, FaMapMarkedAlt, FaLaptop } from 'react-icons/fa';
import styles from './about.module.scss';

export default function AboutPage() {
  return (
    <main className={styles.container}>
      
      {/* --- 1. HERO --- */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>
            Hi, I'm <br/> 
            <span>Banana Planet</span>
          </h1>
          <p>
            Welcome to the planet of bananas... wait, I mean, the planet of <strong>adventures!</strong> 🍌
          </p>
          <p>
            I am a travel filmmaker with a passion for capturing Earth’s raw beauty in stunning 4K. My mission is to take you to the wildest frontiers, taste the most exotic foods, and let you feel the heartbeat of nature right through your screen.
          </p>
          
          <div className={styles.socialLinks}>
            <a href="#" target="_blank" aria-label="YouTube"><FaYoutube /></a>
            <a href="#" target="_blank" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" target="_blank" aria-label="TikTok"><FaTiktok /></a>
            <a href="mailto:contact@bananaplanet.tv" aria-label="Email"><FaEnvelope /></a>
          </div>
        </div>

        <div className={styles.heroImage}>
          <div className={styles.imageWrapper}>
            {/* Creator Portrait */}
            <Image 
              src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1000" 
              alt="Banana Planet Creator" 
              fill 
              className="object-cover"
            />
          </div>
          <div className={styles.badge}>
            Since 2025
          </div>
        </div>
      </section>

      {/* --- 2. STATS --- */}
      <section className={styles.stats}>
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <h3>35+</h3>
            <p>Countries Visited</p>
          </div>
          <div className={styles.statItem}>
            <h3>150+</h3>
            <p>Videos Created</p>
          </div>
          <div className={styles.statItem}>
            <h3>10K+</h3>
            <p>Subscribers</p>
          </div>
          <div className={styles.statItem}>
            <h3>4K</h3>
            <p>Video Quality</p>
          </div>
        </div>
      </section>

      {/* --- 3. STORY (TEXT BLOCK) --- */}
      <section className="max-w-3xl mx-auto px-6 py-12 text-center text-slate-300 leading-relaxed text-lg">
        <h2 className="text-3xl font-bold text-white mb-6">Why "Banana Planet"?</h2>
        <p className="mb-4">
          The name originated from a trip where I got hopelessly lost in a massive banana jungle in Southeast Asia. That's when I realized: Nature is truly magical, vibrant, and sometimes... a little bit hilarious.
        </p>
        <p>
          I don't do "luxury" travel videos. I prefer wading through mud, scaling mountains, and sleeping under a canopy of stars. I hope these films inspire you to pack your bags and set off on your own adventure!
        </p>
      </section>

      {/* --- 4. MY GEAR --- */}
      <section className={styles.gear}>
        <h2><span>My Gear</span></h2>
        <p className="text-slate-400 mb-10">The tools that help me craft cinematic 4K footage.</p>
        
        <div className={styles.gearGrid}>
          <div className={styles.gearItem}>
            <FaCamera className={styles.icon} />
            <h4>Sony A7S III</h4>
            <p>Main Camera</p>
          </div>
          <div className={styles.gearItem}>
            <FaPlane className={styles.icon} />
            <h4>DJI Mavic 3</h4>
            <p>Drone Cinema</p>
          </div>
          <div className={styles.gearItem}>
            <FaMapMarkedAlt className={styles.icon} />
            <h4>GoPro Hero 11</h4>
            <p>Action Cam</p>
          </div>
          <div className={styles.gearItem}>
            <FaLaptop className={styles.icon} />
            <h4>MacBook Pro</h4>
            <p>Editing Station</p>
          </div>
        </div>
      </section>

      {/* --- 5. CTA --- */}
      <section className={styles.cta}>
        <h2>Let's Work Together</h2>
        <p className="text-slate-400 mb-6">Got an epic location? Or looking for a brand partnership?</p>
        <a href="mailto:booking@bananaplanet.tv" className={styles.emailLink}>
          booking@bananaplanet.tv
        </a>
      </section>

    </main>
  );
}