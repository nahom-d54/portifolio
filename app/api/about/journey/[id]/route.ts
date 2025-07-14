import { auth } from "@/lib/auth";
import { db } from "@/lib/db/drizzle";
import { journey } from "@/lib/db/schema";
import type { JourneyItem, JourneyNew } from "@/lib/types/aboutTypes";
import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

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
    const data = await db.delete(journey).where(eq(journey.id, id)).returning();
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
  { params }: { params: Promise<{ id: JourneyItem["id"] }> }
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
  const { year, role, company, description } =
    (await request.json()) as JourneyNew;
  try {
    const updated = await db
      .update(journey)
      .set({ year, role, company, description })
      .where(eq(journey.id, id))
      .returning();

    return NextResponse.json(updated[0]);
  } catch (err) {
    console.log(err);
  }
};
