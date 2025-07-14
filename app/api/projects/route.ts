import { auth } from "@/lib/auth";
import { categories } from "@/lib/constants/category";
import { db } from "@/lib/db/drizzle";
import { projects } from "@/lib/db/schema";
import { withValidation } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  tags: z.array(z.string()).nonempty("At least one tag is required"),
  github: z
    .string()
    .max(255, "GitHub URL is too long")
    .min(1, "GitHub URL is required"),
  demo: z
    .string()
    .min(1, "Demo URL is required")
    .max(255, "Demo URL is too long"),
  featured: z.boolean({ required_error: "Featured status is required" }),
  category: z.enum(categories, { required_error: "Category is required" }),
  image: z.string().max(255, "Image URL is too long"),
});

export const GET = async (request: NextRequest) => {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  try {
    const projectData = await db.select().from(projects);
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

export const POST = withValidation(
  projectSchema,
  async (data, request: NextRequest) => {
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

    try {
      const newJourney = await db.insert(projects).values(data).returning();
      return NextResponse.json(newJourney[0]);
    } catch (error) {
      console.error("Error creating project:", error);
      return NextResponse.json(
        {
          error: "Failed to create passion entry",
        },
        { status: 500 }
      );
    }
  }
);
