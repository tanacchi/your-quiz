# Mutant 999d3bb3 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1441
**Stable ID**: 999d3bb3
**Location**: L710:23–L710:40

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1441
@@ -706,9 +706,9 @@
         it("should handle empty patches array", () => {
           const draft = new Quiz.Draft();
           draft.with({
             id: "quiz-empty-patches",
-            question: "Valid question?",
+            question: "",
             answerType: "boolean",
             solution: { id: "sol-empty", value: true },
             status: "pending_approval",
             creatorId: "creator-empty",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
