// app/api/blogs/[id]/route.js
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET - একটা specific blog fetch করা
export async function GET(request, { params }) {
  try {
    const { id } = params;

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid blog ID",
        },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("blogDB");
    const blog = await db.collection("blogs").findOne({ _id: new ObjectId(id) });

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          error: "Blog not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch blog",
      },
      { status: 500 }
    );
  }
}

// DELETE - Blog মুছে ফেলা
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid blog ID",
        },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("blogDB");
    const result = await db.collection("blogs").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Blog not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete blog",
      },
      { status: 500 }
    );
  }
}