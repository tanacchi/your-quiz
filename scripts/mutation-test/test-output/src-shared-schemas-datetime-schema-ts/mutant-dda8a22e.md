# Mutant dda8a22e Report

**File**: src/shared/schemas/datetime.schema.ts
**Mutator**: ArrowFunction
**Original ID**: 9740
**Stable ID**: dda8a22e
**Location**: L17:14–L17:32

## Diff

```diff
Index: src/shared/schemas/datetime.schema.ts
===================================================================
--- src/shared/schemas/datetime.schema.ts	original
+++ src/shared/schemas/datetime.schema.ts	mutated #9740
@@ -13,9 +13,9 @@
  */
 export const dateStringSchema = z
   .string()
   .regex(iso8601, "Invalid ISO8601 datetime")
-  .transform((s) => new Date(s));
+  .transform(() => undefined);
 
 /**
  * Schema for validating ISO8601 datetime strings without transformation
  * Use this when you need to keep the string format (e.g., for DTOs, API responses)
```

## Hint

ミューテータ "ArrowFunction" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
