# Mutant cd90f968 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1454
**Stable ID**: cd90f968
**Location**: L730:17–L730:34

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1454
@@ -726,9 +726,9 @@
 
         it("should automatically revalidate after applying patches", () => {
           const draft = new Quiz.Draft();
           draft.with({
-            id: "quiz-revalidate",
+            id: "",
             question: "", // Invalid
             answerType: "boolean",
             solution: { id: "sol-revalidate", value: true },
             status: "pending_approval",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
