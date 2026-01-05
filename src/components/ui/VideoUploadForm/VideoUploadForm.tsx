'use client';

import React, { useState } from 'react';
import { FaCloudUploadAlt, FaSpinner, FaPaperPlane, FaCheckCircle, FaYoutube, FaMountain, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';

// Import SCSS Module
import styles from './videoUploadForm.module.scss';
import { useUpload } from '@/src/hooks/useUpload';

export default function VideoUploadForm() {
  // Tab chuyển đổi: 'upload' hoặc 'youtube'
  const [activeTab, setActiveTab] = useState<'upload' | 'youtube'>('upload');

  const [formData, setFormData] = useState({
    title: '', description: '', authorName: '', authorEmail: '',
    bunnyVideoId: '', 
    youtubeUrl: '' 
  });
  
  const { uploadVideoToBunny, uploading, progress } = useUpload();

  // Xử lý upload file (Bunny)
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Gọi hook upload
      const videoTitle = formData.title || file.name;
      const videoId = await uploadVideoToBunny(file, videoTitle);
      
      if (videoId) {
        setFormData({ ...formData, bunnyVideoId: videoId, youtubeUrl: '' }); // Xóa youtube nếu có
        toast.success('Upload successful!');
      }
    }
  };

  // Xử lý submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    if (activeTab === 'upload' && !formData.bunnyVideoId) return toast.error("Please upload the video!");
    if (activeTab === 'youtube' && !formData.youtubeUrl) return toast.error("Please upload the video!");

    const toastId = toast.loading("Sending...");

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed');

      toast.success("Sent successfully!", { id: toastId });
      // Reset form
      setFormData({ title: '', description: '', bunnyVideoId: '', youtubeUrl: '', authorName: '', authorEmail: '' });

    } catch (error) {
      toast.error("Submission error!", { id: toastId });
    }
  };

  return (
    <div className={styles.container}>
      
      <div className={styles.header}>
        <h2>Share Your <span>Discovery</span></h2>
        <p>Send your stunning 4K footage to Banana Planet.</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        
        {/* --- TABS VIÊN THUỐC --- */}
        <div className={styles.tabs}>
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`${styles.tabBtn} ${activeTab === 'upload' ? styles.active : ''}`}
          >
            <FaMountain /> Upload 4K File
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('youtube')}
            className={`${styles.tabBtn} ${activeTab === 'youtube' ? styles.youtubeActive : ''}`}
          >
            <FaYoutube /> YouTube Link
          </button>
        </div>

        {/* --- KHU VỰC UPLOAD (Cửa sổ thiên nhiên) --- */}
        <div className={styles.uploadArea}>
           {activeTab === 'upload' ? (
             <>
               <input 
                 type="file" accept="video/*" onChange={handleFileChange} 
                 disabled={uploading || !!formData.bunnyVideoId} 
               />
               
               {uploading ? (
                 // Trạng thái Loading Xanh lá
                 <div className={styles.loadingState}>
                   <FaSpinner className={styles.spinner} />
                   <span>Uploading to Cloud... {progress}%</span>
                   <div className={styles.progressContainer}>
                      <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
                   </div>
                 </div>
               ) : formData.bunnyVideoId ? (
                 // Trạng thái Success
                 <div className={styles.successState}>
                    <FaCheckCircle className={styles.checkIcon} />
                    <p className={styles.successText}>Ready for Adventure!</p>
                    <p className={styles.fileName}>ID: {formData.bunnyVideoId}</p>
                    <button type="button" onClick={() => setFormData({ ...formData, bunnyVideoId: '' })} className={styles.deleteBtn}>
                       <FaTimes /> Remove File
                    </button>
                 </div>
               ) : (
                 // Trạng thái mặc định
                 <div className={styles.defaultState}>
                   {/* Dùng icon Núi cho hợp theme */}
                   <FaMountain className={styles.icon} /> 
                   <h3 className={styles.ctaText}>Drop Your Footage Here</h3>
                   <p className={styles.subText}>Supports up to 4K quality (Max 1GB)</p>
                 </div>
               )}
             </>
           ) : (
             // Giao diện nhập Youtube
             <div className={styles.youtubeInputWrapper}>
                {/* <FaYoutube className={styles.ytIcon} /> */}
                <input 
                  type="text" 
                  placeholder="Paste YouTube Link here..." 
                  value={formData.youtubeUrl}
                  onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value, bunnyVideoId: '' })}
                />
             </div>
           )}
        </div>

        {/* --- CÁC Ô NHẬP LIỆU (Bo tròn) --- */}
        <div className={styles.grid}>
          <div className={styles.field}>
            <label>Adventure Title</label>
            <input 
              type="text" required placeholder="E.g., Hiking the Alps..."
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
          <div className={styles.field}>
            <label>Explorer Name</label>
            <input 
              type="text" required placeholder="Your Name"
              value={formData.authorName}
              onChange={(e) => setFormData({...formData, authorName: e.target.value})}
            />
          </div>
        </div>

        <div className={styles.field}>
           <label>Contact Email</label>
           <input 
             type="email" required placeholder="email@example.com"
             value={formData.authorEmail}
             onChange={(e) => setFormData({...formData, authorEmail: e.target.value})}
           />
        </div>
        <div className={styles.field}>
          <label>Description</label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Tell us about the context..."
          />
        </div>
        {/* Description Field (Optional - nếu bạn muốn thêm) */}
        {/* <div className={styles.field}><label>Description</label><textarea ... /></div> */}

        {/* Nút Submit Vàng rực */}
        <button type="submit" className={styles.submitBtn} disabled={uploading}>
          <FaPaperPlane /> SHARE ADVENTURE
        </button>

      </form>
    </div>
  );
}