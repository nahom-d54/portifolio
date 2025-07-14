import { auth } from "@/lib/auth";
import { db } from "@/lib/db/drizzle";
import { journey } from "@/lib/db/schema";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  try {
    const journeyData = await db.select().from(journey);
    return NextResponse.json(journeyData);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch data",
      },
      { status: 500 }
    );
  }
};

export const POST = async (request: NextRequest) => {
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

  const body = await request.json();
  const { company, year, role, description } = body;

  try {
    const newJourney = await db
      .insert(journey)
      .values({ company, year, role, description })
      .returning();
    return NextResponse.json(newJourney[0]);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to create journey",
      },
      { status: 500 }
    );
  }
};
