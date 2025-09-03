# Mutant 9920f87f Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1302
**Stable ID**: 9920f87f
**Location**: L513:23–L513:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1302
@@ -509,9 +509,9 @@
         it("should handle multiple patch applications", () => {
           const draft = new Quiz.Draft();
           draft.with({
             id: "quiz-multi-patches",
-            question: "  ",
+            question: "",
             answerType: "bool" as unknown as "boolean",
             solution: { id: "sol-multi-null", value: true },
             status: "pending_approval",
             creatorId: "creator-multi",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
