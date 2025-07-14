import { passions } from "../db/schema";

export type PassionType = typeof passions.$inferSelect;
export type PassionInsertType = typeof passions.$inferInsert;
