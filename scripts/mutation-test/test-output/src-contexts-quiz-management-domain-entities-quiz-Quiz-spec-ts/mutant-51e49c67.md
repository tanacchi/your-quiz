# Mutant 51e49c67 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1469
**Stable ID**: 51e49c67
**Location**: L753:23–L753:43

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1469
@@ -749,9 +749,9 @@
         it("should work with object patches", () => {
           const draft = new Quiz.Draft();
           draft.with({
             id: "quiz-object-patch",
-            question: "Object patch test?",
+            question: "",
             answerType: "boolean",
             solution: { id: "sol-obj", value: true },
             status: "pending_approval",
             creatorId: "creator-obj",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
