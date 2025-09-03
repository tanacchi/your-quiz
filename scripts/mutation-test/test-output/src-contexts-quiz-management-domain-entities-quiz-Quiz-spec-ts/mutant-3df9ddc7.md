# Mutant 3df9ddc7 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1265
**Stable ID**: 3df9ddc7
**Location**: L456:29–L456:40

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1265
@@ -452,9 +452,9 @@
           draft.with({
             id: "quiz-cross-validation",
             question: "Valid question?",
             answerType: "boolean",
-            solution: { id: "sol-cross", value: true },
+            solution: { id: "", value: true },
             status: "approved", // Invalid without approvedAt
             creatorId: "creator-cross",
             createdAt: "2023-12-01 10:00:00",
             // Missing approvedAt for approved status
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
