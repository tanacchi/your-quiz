# Mutant 1f60274c Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 1457
**Stable ID**: 1f60274c
**Location**: L733:23–L733:60

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1457
@@ -729,9 +729,9 @@
           draft.with({
             id: "quiz-revalidate",
             question: "", // Invalid
             answerType: "boolean",
-            solution: { id: "sol-revalidate", value: true },
+            solution: {},
             status: "pending_approval",
             creatorId: "creator-revalidate",
             createdAt: "2023-12-01 10:00:00",
           });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
