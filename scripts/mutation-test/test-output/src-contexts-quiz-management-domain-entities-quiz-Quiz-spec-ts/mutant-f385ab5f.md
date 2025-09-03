# Mutant f385ab5f Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1364
**Stable ID**: f385ab5f
**Location**: L610:23–L610:61

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1364
@@ -606,9 +606,9 @@
         it("should be equivalent to draft.commit()", () => {
           const draft = new Quiz.Draft();
           draft.with({
             id: "quiz-equivalent",
-            question: "Are fromDraft and commit equivalent?",
+            question: "",
             answerType: "boolean",
             solution: { id: "sol-equivalent", value: true },
             status: "pending_approval",
             creatorId: "creator-equivalent",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
