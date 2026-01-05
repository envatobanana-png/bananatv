
import { apiVersion, dataset, projectId } from "@/src/sanity/env";
import { createClient } from "next-sanity";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_API_TOKEN, // Lấy token từ biến môi trường
  useCdn: false, // Không cache khi ghi
});
  try {
    const body = await req.json();
    const { title, description, bunnyVideoId, youtubeUrl, authorName, authorEmail } = body;

    // --- LOGIC VALIDATION CŨ (BỊ LỖI) ---
    // if (!title || !bunnyVideoId || !authorName || !authorEmail) { ... }

    // --- LOGIC VALIDATION MỚI (ĐÃ FIX) ---
    // Yêu cầu: Phải có Title, Tên, Email VÀ (phải có BunnyID HOẶC YoutubeURL)
    const hasVideoSource = bunnyVideoId || youtubeUrl;

    if (!title || !authorName || !authorEmail || !hasVideoSource) {
      console.error("Validation failed:", { title, authorName, hasVideoSource });
      return NextResponse.json(
        { message: "Missing required information (Title, Author, or Video Source)" },
        { status: 400 } // Nên trả về 400 (Bad Request) thay vì 500
      );
    }

    // Tạo document trong Sanity
    const result = await writeClient.create({
      _type: 'submission', // Đảm bảo tên schema đúng là 'submission'
      title,
      description: description || '',
      // Lưu nguồn video tương ứng
      bunnyVideoId: bunnyVideoId || undefined, 
      youtubeUrl: youtubeUrl || undefined,
      
      authorName,
      authorEmail,
      status: 'pending', // Trạng thái chờ duyệt
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json({ message: "Success", id: result._id }, { status: 200 });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: String(error) },
      { status: 500 }
    );
  }
}