# Mutant a6c0813c Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 7610
**Stable ID**: a6c0813c
**Location**: L258:32–L258:68

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7610
@@ -254,9 +254,9 @@
         expectValidParse(zodBasicQuizInfoSchema, createValidBasicQuizInfo());
       });
 
       test("should reject invalid basic quiz info", () => {
-        const requiredFields = ["id", "solution_id", "answer_type"];
+        const requiredFields = [];
 
         requiredFields.forEach((field) => {
           const baseInfo = createValidBasicQuizInfo();
           const invalidInfo = { ...baseInfo };
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
