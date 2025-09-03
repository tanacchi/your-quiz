# Mutant ca36a565 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 1471
**Stable ID**: ca36a565
**Location**: L755:23–L755:53

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1471
@@ -751,9 +751,9 @@
           draft.with({
             id: "quiz-object-patch",
             question: "Object patch test?",
             answerType: "boolean",
-            solution: { id: "sol-obj", value: true },
+            solution: {},
             status: "pending_approval",
             creatorId: "creator-obj",
             createdAt: "2023-12-01 10:00:00",
           });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
