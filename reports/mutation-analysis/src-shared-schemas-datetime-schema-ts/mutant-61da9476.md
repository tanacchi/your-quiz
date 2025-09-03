# Mutant 61da9476 Report

**File**: src/shared/schemas/datetime.schema.ts
**Mutator**: StringLiteral
**Original ID**: 172
**Stable ID**: 61da9476
**Location**: L25:19–L25:45

## Diff

```diff
Index: src/shared/schemas/datetime.schema.ts
===================================================================
--- src/shared/schemas/datetime.schema.ts	original
+++ src/shared/schemas/datetime.schema.ts	mutated #172
@@ -21,9 +21,9 @@
  * Use this when you need to keep the string format (e.g., for DTOs, API responses)
  */
 export const dateStringOnlySchema = z
   .string()
-  .regex(iso8601, "Invalid ISO8601 datetime");
+  .regex(iso8601, "");
 
 /**
  * SQLite/D1 datetime format regex
  * Matches: YYYY-MM-DD HH:MM:SS (space-separated format)
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。