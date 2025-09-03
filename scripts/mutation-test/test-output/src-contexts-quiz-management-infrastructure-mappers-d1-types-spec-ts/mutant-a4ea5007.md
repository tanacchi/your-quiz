# Mutant a4ea5007 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7527
**Stable ID**: a4ea5007
**Location**: L132:12–L132:49

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7527
@@ -128,9 +128,9 @@
           expectValidParse(zodQuizStatusSchema, status);
         });
       });
 
-      test("should reject invalid quiz statuses", () => {
+      test("", () => {
         const invalidStatuses = ["invalid", "", null, undefined];
 
         invalidStatuses.forEach((status) => {
           expectInvalidParse(zodQuizStatusSchema, status);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
