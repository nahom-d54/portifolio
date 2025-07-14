import { auth } from "@/lib/auth";
import { db } from "@/lib/db/drizzle";
import { passions } from "@/lib/db/schema";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const data = await db.select().from(passions);
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: `Error: ${err}` });
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
  try {
    const body = await request.json();
    const { title, icon, description } = body;

    const inserteddata = await db
      .insert(passions)
      .values({ title, icon, description })
      .returning();
    return NextResponse.json(inserteddata);
  } catch (err) {
    return NextResponse.json({ error: `Error: ${err}` });
  }
};
