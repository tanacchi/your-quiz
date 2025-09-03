# Mutant 582dc7e6 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1444
**Stable ID**: 582dc7e6
**Location**: L712:29–L712:40

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1444
@@ -708,9 +708,9 @@
           draft.with({
             id: "quiz-empty-patches",
             question: "Valid question?",
             answerType: "boolean",
-            solution: { id: "sol-empty", value: true },
+            solution: { id: "", value: true },
             status: "pending_approval",
             creatorId: "creator-empty",
             createdAt: "2023-12-01 10:00:00",
           });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
