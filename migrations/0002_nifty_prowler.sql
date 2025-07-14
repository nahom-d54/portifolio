ALTER TABLE "journey" ALTER COLUMN "id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "journey" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (sequence name "journey_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1000 CACHE 1);--> statement-breakpoint
ALTER TABLE "passions" ALTER COLUMN "id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "passions" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (sequence name "passions_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1000 CACHE 1);--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (sequence name "projects_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1000 CACHE 1);