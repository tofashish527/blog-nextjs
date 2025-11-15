// app/api/blogs/route.js
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// GET - সব blogs fetch করা
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("blogDB");
    const blogs = await db.collection("blogs").find({}).toArray();

    return NextResponse.json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch blogs",
      },
      { status: 500 }
    );
  }
}

// POST - নতুন blog create করা
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, content, author } = body;

    // Validation
    if (!title || !content || !author) {
      return NextResponse.json(
        {
          success: false,
          error: "Title, content, and author are required",
        },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("blogDB");

    const newBlog = {
      title,
      content,
      author,
      createdAt: new Date(),
    };

    const result = await db.collection("blogs").insertOne(newBlog);

    return NextResponse.json({
      success: true,
      data: {
        _id: result.insertedId,
        ...newBlog,
      },
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create blog",
      },
      { status: 500 }
    );
  }
}