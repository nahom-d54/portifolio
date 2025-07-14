import { auth } from "@/lib/auth";
import { db } from "@/lib/db/drizzle";
import { projects } from "@/lib/db/schema";
import { ProjectType } from "@/lib/types/project";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
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
  const id = (await params).id;
  try {
    const data = await db
      .delete(projects)
      .where(eq(projects.id, id))
      .returning();
    return NextResponse.json(data);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: `Error occured: ${err}` },
      { status: 500 }
    );
  }
};

export const PUT = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: ProjectType["id"] }> }
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

  const body = await request.json();
  const { title, description, tags, github, demo, featured, category, image } =
    body;

  try {
    const updatedProject = await db
      .update(projects)
      .set({
        title,
        description,
        tags,
        github,
        demo,
        featured,
        category,
        image,
      })
      .where(eq(projects.id, id))
      .returning();
    return NextResponse.json(updatedProject[0]);
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      {
        error: "Failed to update project",
      },
      { status: 500 }
    );
  }
};
