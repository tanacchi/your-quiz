# Mutant 6d426c52 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1261
**Stable ID**: 6d426c52
**Location**: L453:17–L453:40

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1261
@@ -449,9 +449,9 @@
 
         it("should handle cross-field validation errors", () => {
           const draft = new Quiz.Draft();
           draft.with({
-            id: "quiz-cross-validation",
+            id: "",
             question: "Valid question?",
             answerType: "boolean",
             solution: { id: "sol-cross", value: true },
             status: "approved", // Invalid without approvedAt
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
