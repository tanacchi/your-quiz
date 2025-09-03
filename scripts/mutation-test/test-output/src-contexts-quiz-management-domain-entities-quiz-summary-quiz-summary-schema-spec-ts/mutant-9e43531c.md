# Mutant 9e43531c Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5300
**Stable ID**: 9e43531c
**Location**: L337:14–L337:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5300
@@ -333,9 +333,9 @@
     });
   });
 
   describe("Edge Cases and Boundary Values", () => {
-    describe("Long Strings", () => {
+    describe("", () => {
       it("should accept very long question", () => {
         const longQuestion = "A".repeat(1000);
         const data = { ...validQuizSummaryData, question: longQuestion };
         const result = QuizSummarySchema.safeParse(data);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
