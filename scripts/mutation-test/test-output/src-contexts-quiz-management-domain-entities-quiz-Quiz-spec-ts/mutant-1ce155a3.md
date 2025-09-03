# Mutant 1ce155a3 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1325
**Stable ID**: 1ce155a3
**Location**: L547:17–L547:32

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1325
@@ -543,9 +543,9 @@
 
         it("should preserve valid fields when applying patches", () => {
           const draft = new Quiz.Draft();
           const validData = {
-            id: "quiz-preserve",
+            id: "",
             question: "Valid question to preserve?",
             answerType: "boolean" as const,
             solution: { id: "sol-preserve", value: true },
             status: "pending_approval" as const,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
