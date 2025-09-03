# Mutant 614fea5f Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1391
**Stable ID**: 614fea5f
**Location**: L648:17–L648:36

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1391
@@ -644,9 +644,9 @@
       describe("applyPatches method", () => {
         it("should apply single patch correctly", () => {
           const draft = new Quiz.Draft();
           draft.with({
-            id: "quiz-single-patch",
+            id: "",
             question: "   ", // Whitespace only - will need patch
             answerType: "boolean",
             solution: { id: "sol-single", value: true },
             status: "pending_approval",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
