import { auth } from "@/lib/auth";
import { db } from "@/lib/db/drizzle";
import { projects } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  try {
    const projectData = await db
      .select()
      .from(projects)
      .where(eq(projects.featured, true))
      .limit(6);
    return NextResponse.json(projectData);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch data",
      },
      { status: 500 }
    );
  }
};
