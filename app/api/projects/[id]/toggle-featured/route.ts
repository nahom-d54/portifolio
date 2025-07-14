import { auth } from "@/lib/auth";
import { db } from "@/lib/db/drizzle";
import { projects } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

export const POST = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) => {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      { status: 401 }
    );
  }
  const { id } = await params;

  try {
    const updateFeaturedProject = await db
      .update(projects)
      .set({ featured: sql`NOT ${projects.featured}` })
      .where(eq(projects.id, id))
      .returning();
    return NextResponse.json(updateFeaturedProject[0]);
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      {
        error: "Failed to create project",
      },
      { status: 500 }
    );
  }
};
