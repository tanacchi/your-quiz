# Mutant ef90c668 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 1366
**Stable ID**: ef90c668
**Location**: L612:23–L612:60

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1366
@@ -608,9 +608,9 @@
           draft.with({
             id: "quiz-equivalent",
             question: "Are fromDraft and commit equivalent?",
             answerType: "boolean",
-            solution: { id: "sol-equivalent", value: true },
+            solution: {},
             status: "pending_approval",
             creatorId: "creator-equivalent",
             createdAt: "2023-12-01 10:00:00",
           });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
