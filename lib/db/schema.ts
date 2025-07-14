import {
  integer,
  text,
  boolean,
  pgTable,
  varchar,
  pgEnum,
} from "drizzle-orm/pg-core";
import { categories } from "../constants/category";

export const categorieEnum = pgEnum("categories", categories);

export const journey = pgTable("journey", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ startWith: 1000 }),
  year: varchar("year").notNull(),
  role: varchar("role").notNull(),
  company: varchar("company").notNull(),
  description: text("description").notNull(),
});

export const passions = pgTable("passions", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ startWith: 1000 }),
  title: varchar("title").notNull(),
  icon: varchar("icon").notNull(),
  description: text("description").notNull(),
});

export const projects = pgTable("projects", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ startWith: 1000 }),
  title: varchar("title").notNull(),
  description: text("description").notNull(),
  image: varchar("image").notNull(),
  tags: varchar("tags").array().notNull(),
  github: varchar("github").notNull(),
  demo: varchar("demo").notNull(),
  featured: boolean("featured").default(false).notNull(),
  category: categorieEnum().notNull(),
});
