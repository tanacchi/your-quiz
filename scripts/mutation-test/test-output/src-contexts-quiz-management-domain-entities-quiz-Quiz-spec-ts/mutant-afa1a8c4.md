# Mutant afa1a8c4 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1285
**Stable ID**: afa1a8c4
**Location**: L480:23–L480:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1285
@@ -476,9 +476,9 @@
         it("should work with patch application using applyPatches", () => {
           const draft = new Quiz.Draft();
           draft.with({
             id: "quiz-patches",
-            question: "   ", // Invalid whitespace-only question
+            question: "", // Invalid whitespace-only question
             answerType: "bool" as unknown as "boolean", // Invalid answerType
             solution: { id: "sol-patches", value: true },
             status: "pending_approval", // Valid status
             creatorId: "creator-patches",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
