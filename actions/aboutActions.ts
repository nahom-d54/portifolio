"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db/drizzle";
import { journey, passions } from "@/lib/db/schema";

const getJourney = async () => {
  const data = await db.select().from(journey);
  return data;
};

const getPassions = async () => {
  const data = await db.select().from(passions);
  return data;
};

const addJourney = async (data: any) => {
  await db.insert(journey).values(data);
  revalidatePath("/about");
};

const addPassion = async (data: any) => {
  await db.insert(passions).values(data);
  revalidatePath("/about");
};

const deleteJourney = async (id: number) => {
  await db.delete(journey).where(eq(journey.id, id));
  revalidatePath("/about");
};

const deletePassion = async (id: number) => {
  await db.delete(passions).where(eq(passions.id, id));
  revalidatePath("/about");
};

export {
  getJourney,
  getPassions,
  addJourney,
  addPassion,
  deleteJourney,
  deletePassion,
};
