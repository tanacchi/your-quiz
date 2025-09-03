# Mutant b8997b2c Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 387
**Stable ID**: b8997b2c
**Location**: L241:14–L241:36

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #387
@@ -237,9 +237,9 @@
     });
   });
 
   describe("listQueryFromReq Transformation Pipeline", () => {
-    describe("Raw Input Processing", () => {
+    describe("", () => {
       it("should handle empty raw input", () => {
         const rawInput = {};
         const result = listQueryFromReq.safeParse(rawInput);
         expect(result.success).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
