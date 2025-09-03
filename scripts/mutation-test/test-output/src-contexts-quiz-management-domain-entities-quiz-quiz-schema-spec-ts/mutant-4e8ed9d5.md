# Mutant 4e8ed9d5 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2837
**Stable ID**: 4e8ed9d5
**Location**: L59:10–L59:53

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2837
@@ -55,9 +55,9 @@
   });
 
   describe("QuizSchema Validation", () => {
     describe("Required Fields", () => {
-      it("should accept valid complete boolean quiz", () => {
+      it("", () => {
         const result = QuizSchema.safeParse(validQuizData);
         expect(result.success).toBe(true);
 
         if (result.success) {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
