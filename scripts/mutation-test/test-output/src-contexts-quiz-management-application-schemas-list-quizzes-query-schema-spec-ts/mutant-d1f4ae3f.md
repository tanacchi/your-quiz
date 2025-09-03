# Mutant d1f4ae3f Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 389
**Stable ID**: d1f4ae3f
**Location**: L242:10–L242:41

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #389
@@ -238,9 +238,9 @@
   });
 
   describe("listQueryFromReq Transformation Pipeline", () => {
     describe("Raw Input Processing", () => {
-      it("should handle empty raw input", () => {
+      it("", () => {
         const rawInput = {};
         const result = listQueryFromReq.safeParse(rawInput);
         expect(result.success).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
