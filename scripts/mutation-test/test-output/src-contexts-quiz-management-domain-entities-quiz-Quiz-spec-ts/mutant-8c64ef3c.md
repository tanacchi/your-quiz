# Mutant 8c64ef3c Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 1459
**Stable ID**: 8c64ef3c
**Location**: L733:54–L733:58

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1459
@@ -729,9 +729,9 @@
           draft.with({
             id: "quiz-revalidate",
             question: "", // Invalid
             answerType: "boolean",
-            solution: { id: "sol-revalidate", value: true },
+            solution: { id: "sol-revalidate", value: false },
             status: "pending_approval",
             creatorId: "creator-revalidate",
             createdAt: "2023-12-01 10:00:00",
           });
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
