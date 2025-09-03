# Mutant e0cf95cb Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 1490
**Stable ID**: e0cf95cb
**Location**: L777:49–L777:53

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1490
@@ -773,9 +773,9 @@
           draft.with({
             id: "quiz-patch-error",
             question: "Patch error test?",
             answerType: "boolean",
-            solution: { id: "sol-error", value: true },
+            solution: { id: "sol-error", value: false },
             status: "pending_approval",
             creatorId: "creator-error",
             createdAt: "2023-12-01 10:00:00",
           });
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
