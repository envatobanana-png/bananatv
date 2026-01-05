import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaPlane, FaMapMarkerAlt, FaGlobeAmericas, FaPlay } from 'react-icons/fa';
import styles from '@/src/styles/banana.module.scss';

// 1. Import Sanity Client & GROQ

import { groq } from "next-sanity";
import VideoUploadForm from '../components/ui/VideoUploadForm/VideoUploadForm';
import { client } from '../sanity/lib/client';

// 2. Định nghĩa kiểu dữ liệu (Interface)
interface TravelVideo {
  _id: string;
  title: string;
  slug: string;
  thumbnail: string;
  location?: string;
  views?: number; // Nếu chưa có field này trong Sanity thì có thể mock
  category?: string;
}

// 3. Hàm lấy dữ liệu (Server-side)
async function getTravelVideos(): Promise<TravelVideo[]> {
  const query = groq`*[_type == "archiveVideo"] | order(publishedAt desc)[0...9] {
    _id,
    title,
    "slug": slug.current,
    "thumbnail": thumbnail.asset->url,
    location, 
    "category": category->title, // Nếu category là reference
    views 
  }`;
  
  // Dùng { cache: 'no-store' } nếu muốn real-time, hoặc revalidate ở dưới
  return await client.fetch(query);
}

// Cấu hình Revalidate (ISR): Cập nhật data mỗi 60 giây
export const revalidate = 60;

// Danh mục tĩnh (Có thể lấy động nếu muốn)
const categories = ['All', 'Mountains', 'Rivers', 'Cities', 'Forests', 'Ancient Towns'];

export default async function BananaHomePage() {
  // 4. Gọi hàm lấy dữ liệu
  const travelVideos = await getTravelVideos();

  return (
    <main className={styles.mainContainer}>
      
      {/* --- 1. HERO SECTION --- */}
      <section className={styles.heroSection}>
        <video 
          autoPlay loop muted playsInline 
          className={styles.videoBackground}
          poster="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2000"
        >
          {/* Bạn nhớ thay link video nền phù hợp */}
          <source src="https://cdn.pixabay.com/video/2020/05/25/40149-424076356_large.mp4" type="video/mp4" />
        </video>

        <div className={styles.heroContent}>
          <h1>
            BANANA <span>PLANET</span>
          </h1>
          <p>
            The Planet of Amazing Discoveries. <br/>
            Khám phá những kỳ quan thiên nhiên ẩn giấu đẹp nhất thế giới.
          </p>
          <Link href="/video" className={styles.exploreBtn}>
            <FaPlane /> Start Journey
          </Link>
        </div>
      </section>

      {/* --- 2. CATEGORY FILTER --- */}
     {/*  <div className={styles.categoryScroll}>
        {categories.map((cat, idx) => (
            <span key={cat} className={`${styles.pill} ${idx === 0 ? styles.active : ''}`}>
                {cat}
            </span>
        ))}
      </div> */}

      {/* --- 3. TRAVEL GRID (DỮ LIỆU TỪ SANITY) --- */}
      <section className={styles.grid}>
        {travelVideos.length > 0 ? (
          travelVideos.map((video) => (
            <Link href={`/video/${video.slug}`} key={video._id} className={styles.travelCard}>
              
              <div className={styles.thumbBox}>
                {/* Check xem có ảnh không, nếu không thì hiện ảnh fallback */}
                {video.thumbnail ? (
                  <Image 
                    src={video.thumbnail} 
                    alt={video.title} 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500">
                    <FaPlay className="text-4xl opacity-50"/>
                  </div>
                )}
                
                {/* Badge địa điểm (Lấy từ Sanity hoặc mặc định Earth) */}
                {/* <div className={styles.locationBadge}>
                  <FaMapMarkerAlt /> {video.location || 'China'}
                </div> */}
              </div>
              
              <div className={styles.content}>
                <h3>{video.title}</h3>
                <div className={styles.meta}>
                  <span className="flex items-center gap-1">
                    <FaGlobeAmericas/> {video.category || 'Travel Guide'}
                  </span>
                  
                  {/* Nếu Sanity chưa có views, random tạm số cho đẹp */}
                  <span>{video.views || Math.floor(Math.random() * 50) + 1}K Views</span>
                </div>
              </div>

            </Link>
          ))
        ) : (
          // Empty State nếu chưa có video nào
          <div className="col-span-full text-center py-20">
            <h3 className="text-2xl font-bold text-white mb-2">Chưa có chuyến đi nào! 🍌</h3>
            <p className="text-slate-400">Hãy upload video đầu tiên từ trang quản trị.</p>
          </div>
        )}
      </section>
      <VideoUploadForm />
    </main>
  );
}