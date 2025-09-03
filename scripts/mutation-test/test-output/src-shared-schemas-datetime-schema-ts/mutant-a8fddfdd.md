# Mutant a8fddfdd Report

**File**: src/shared/schemas/datetime.schema.ts
**Mutator**: StringLiteral
**Original ID**: 9739
**Stable ID**: a8fddfdd
**Location**: L16:19–L16:45

## Diff

```diff
Index: src/shared/schemas/datetime.schema.ts
===================================================================
--- src/shared/schemas/datetime.schema.ts	original
+++ src/shared/schemas/datetime.schema.ts	mutated #9739
@@ -12,9 +12,9 @@
  * Use this when you need Date objects for business logic
  */
 export const dateStringSchema = z
   .string()
-  .regex(iso8601, "Invalid ISO8601 datetime")
+  .regex(iso8601, "")
   .transform((s) => new Date(s));
 
 /**
  * Schema for validating ISO8601 datetime strings without transformation
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
