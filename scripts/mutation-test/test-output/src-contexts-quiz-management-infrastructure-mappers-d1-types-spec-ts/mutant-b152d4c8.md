# Mutant b152d4c8 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7573
**Stable ID**: b152d4c8
**Location**: L208:12–L208:51

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7573
@@ -204,9 +204,9 @@
 
         expectValidParse(zodQuizRowSchema, rowWithNulls);
       });
 
-      test("should reject missing required fields", () => {
+      test("", () => {
         const requiredFields = [
           "id",
           "question",
           "answer_type",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
