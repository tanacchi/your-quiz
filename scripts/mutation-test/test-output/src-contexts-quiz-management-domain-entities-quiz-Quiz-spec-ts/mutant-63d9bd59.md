# Mutant 63d9bd59 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 1368
**Stable ID**: 63d9bd59
**Location**: L612:54–L612:58

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1368
@@ -608,9 +608,9 @@
           draft.with({
             id: "quiz-equivalent",
             question: "Are fromDraft and commit equivalent?",
             answerType: "boolean",
-            solution: { id: "sol-equivalent", value: true },
+            solution: { id: "sol-equivalent", value: false },
             status: "pending_approval",
             creatorId: "creator-equivalent",
             createdAt: "2023-12-01 10:00:00",
           });
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
