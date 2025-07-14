import { auth } from "@/lib/auth";
import { db } from "@/lib/db/drizzle";
import { journey, passions } from "@/lib/db/schema";
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
      .delete(passions)
      .where(eq(passions.id, id))
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
  const data = await request.json();
  try {
    const updated = await db
      .update(passions)
      .set(data)
      .where(eq(passions.id, id))
      .returning();

    return NextResponse.json(updated[0]);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: `Error occured: ${err}` },
      { status: 500 }
    );
  }
};
