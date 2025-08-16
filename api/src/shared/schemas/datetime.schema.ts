import { z } from "zod";

/**
 * ISO8601 datetime format regex
 * Matches: YYYY-MM-DDTHH:mm:ss.sssZ (with optional milliseconds)
 * Examples: 2024-01-15T10:30:00Z, 2024-01-15T10:30:00.123Z
 */
const iso8601 = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/;

/**
 * Schema for validating ISO8601 datetime strings and transforming to Date objects
 * Use this when you need Date objects for business logic
 */
export const dateStringSchema = z
  .string()
  .regex(iso8601, "Invalid ISO8601 datetime")
  .transform((s) => new Date(s));

/**
 * Schema for validating ISO8601 datetime strings without transformation
 * Use this when you need to keep the string format (e.g., for DTOs, API responses)
 */
export const dateStringOnlySchema = z
  .string()
  .regex(iso8601, "Invalid ISO8601 datetime");

/**
 * SQLite/D1 datetime format regex
 * Matches: YYYY-MM-DD HH:MM:SS (space-separated format)
 * Examples: 2025-08-11 08:46:01, 2024-01-15 10:30:00
 */
const sqliteDateTime = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

/**
 * Schema for validating SQLite/D1 datetime strings without transformation
 * Use this for D1 database datetime fields (CURRENT_TIMESTAMP format)
 */
export const sqliteDateTimeSchema = z
  .string()
  .regex(
    sqliteDateTime,
    "Invalid SQLite datetime format (expected YYYY-MM-DD HH:MM:SS)",
  );
