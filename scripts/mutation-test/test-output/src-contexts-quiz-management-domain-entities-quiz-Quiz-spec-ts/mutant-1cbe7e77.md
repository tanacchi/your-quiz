# Mutant 1cbe7e77 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1392
**Stable ID**: 1cbe7e77
**Location**: L649:23–L649:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1392
@@ -645,9 +645,9 @@
         it("should apply single patch correctly", () => {
           const draft = new Quiz.Draft();
           draft.with({
             id: "quiz-single-patch",
-            question: "   ", // Whitespace only - will need patch
+            question: "", // Whitespace only - will need patch
             answerType: "boolean",
             solution: { id: "sol-single", value: true },
             status: "pending_approval",
             creatorId: "creator-single",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
