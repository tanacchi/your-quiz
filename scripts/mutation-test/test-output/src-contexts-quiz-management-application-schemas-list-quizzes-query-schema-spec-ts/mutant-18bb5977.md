# Mutant 18bb5977 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 385
**Stable ID**: 18bb5977
**Location**: L240:12–L240:54

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #385
@@ -236,9 +236,9 @@
       });
     });
   });
 
-  describe("listQueryFromReq Transformation Pipeline", () => {
+  describe("", () => {
     describe("Raw Input Processing", () => {
       it("should handle empty raw input", () => {
         const rawInput = {};
         const result = listQueryFromReq.safeParse(rawInput);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
