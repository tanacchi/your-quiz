# Mutant 1ca6907d Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1363
**Stable ID**: 1ca6907d
**Location**: L609:17–L609:34

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1363
@@ -605,9 +605,9 @@
 
         it("should be equivalent to draft.commit()", () => {
           const draft = new Quiz.Draft();
           draft.with({
-            id: "quiz-equivalent",
+            id: "",
             question: "Are fromDraft and commit equivalent?",
             answerType: "boolean",
             solution: { id: "sol-equivalent", value: true },
             status: "pending_approval",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
