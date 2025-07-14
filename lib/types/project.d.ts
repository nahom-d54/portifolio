import { projects } from "../db/schema";

export type ProjectType = typeof projects.$inferSelect;
export type ProjectInsertType = typeof projects.$inferInsert;
