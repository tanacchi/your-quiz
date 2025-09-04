# Mutant d4e9f80d Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: StringLiteral
**Original ID**: 36
**Stable ID**: d4e9f80d
**Location**: L30:3–L30:13

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #36
@@ -26,9 +26,9 @@
 
 export const zodQuizStatusSchema = z.enum([
   "pending_approval",
   "approved",
-  "rejected",
+  "",
 ]);
 
 export const zodMatchingStrategySchema = z.enum(["exact", "partial", "regex"]);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。