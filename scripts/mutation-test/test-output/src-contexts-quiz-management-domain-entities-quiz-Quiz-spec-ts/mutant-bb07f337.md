# Mutant bb07f337 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 1473
**Stable ID**: bb07f337
**Location**: L755:47–L755:51

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1473
@@ -751,9 +751,9 @@
           draft.with({
             id: "quiz-object-patch",
             question: "Object patch test?",
             answerType: "boolean",
-            solution: { id: "sol-obj", value: true },
+            solution: { id: "sol-obj", value: false },
             status: "pending_approval",
             creatorId: "creator-obj",
             createdAt: "2023-12-01 10:00:00",
           });
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
