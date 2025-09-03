# Mutant 7c31e222 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7608
**Stable ID**: 7c31e222
**Location**: L257:12–L257:51

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7608
@@ -253,9 +253,9 @@
       test("should validate valid basic quiz info", () => {
         expectValidParse(zodBasicQuizInfoSchema, createValidBasicQuizInfo());
       });
 
-      test("should reject invalid basic quiz info", () => {
+      test("", () => {
         const requiredFields = ["id", "solution_id", "answer_type"];
 
         requiredFields.forEach((field) => {
           const baseInfo = createValidBasicQuizInfo();
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
