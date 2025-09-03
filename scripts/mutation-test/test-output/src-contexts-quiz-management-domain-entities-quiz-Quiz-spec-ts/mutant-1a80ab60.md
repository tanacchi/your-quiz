# Mutant 1a80ab60 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 1266
**Stable ID**: 1a80ab60
**Location**: L456:49–L456:53

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1266
@@ -452,9 +452,9 @@
           draft.with({
             id: "quiz-cross-validation",
             question: "Valid question?",
             answerType: "boolean",
-            solution: { id: "sol-cross", value: true },
+            solution: { id: "sol-cross", value: false },
             status: "approved", // Invalid without approvedAt
             creatorId: "creator-cross",
             createdAt: "2023-12-01 10:00:00",
             // Missing approvedAt for approved status
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
