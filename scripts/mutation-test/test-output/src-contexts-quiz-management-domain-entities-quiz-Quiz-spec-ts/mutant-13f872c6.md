# Mutant 13f872c6 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1486
**Stable ID**: 13f872c6
**Location**: L775:23–L775:42

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1486
@@ -771,9 +771,9 @@
         it("should handle patch application errors gracefully", () => {
           const draft = new Quiz.Draft();
           draft.with({
             id: "quiz-patch-error",
-            question: "Patch error test?",
+            question: "",
             answerType: "boolean",
             solution: { id: "sol-error", value: true },
             status: "pending_approval",
             creatorId: "creator-error",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
