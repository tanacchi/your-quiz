# Mutant 0cad7276 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1440
**Stable ID**: 0cad7276
**Location**: L709:17–L709:37

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1440
@@ -705,9 +705,9 @@
 
         it("should handle empty patches array", () => {
           const draft = new Quiz.Draft();
           draft.with({
-            id: "quiz-empty-patches",
+            id: "",
             question: "Valid question?",
             answerType: "boolean",
             solution: { id: "sol-empty", value: true },
             status: "pending_approval",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
