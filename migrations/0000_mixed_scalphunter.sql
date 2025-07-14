CREATE TYPE "public"."categories" AS ENUM('Full-Stack', 'Back-End', 'Front-End');--> statement-breakpoint
CREATE TABLE "journey" (
	"id" integer PRIMARY KEY NOT NULL,
	"year" varchar NOT NULL,
	"role" varchar NOT NULL,
	"company" varchar NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "passions" (
	"id" integer PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"icon" varchar NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" integer PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"description" text NOT NULL,
	"image" varchar NOT NULL,
	"tags" varchar[] NOT NULL,
	"github" varchar NOT NULL,
	"demo" varchar NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"category" "categories" NOT NULL
);
