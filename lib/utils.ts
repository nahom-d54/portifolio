import type { NextRequest } from "next/server";
import { type ZodSchema, ZodError } from "zod";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function withValidation<T>(
  schema: ZodSchema<T>,
  handler: (data: T, req: NextRequest) => Promise<Response>
) {
  return async (req: NextRequest): Promise<Response> => {
    try {
      const body = await req.json();
      const parsed = schema.parse(body);
      return await handler(parsed, req);
    } catch (err) {
      if (err instanceof ZodError) {
        return new Response(
          JSON.stringify({ error: "Invalid input", issues: err.errors }),
          { status: 400 }
        );
      }
      console.error("Internal error:", err);
      return new Response("Internal Server Error", { status: 500 });
    }
  };
}
