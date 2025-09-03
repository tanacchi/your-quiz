# Mutant eccb1fe1 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1458
**Stable ID**: eccb1fe1
**Location**: L733:29–L733:45

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1458
@@ -729,9 +729,9 @@
           draft.with({
             id: "quiz-revalidate",
             question: "", // Invalid
             answerType: "boolean",
-            solution: { id: "sol-revalidate", value: true },
+            solution: { id: "", value: true },
             status: "pending_approval",
             creatorId: "creator-revalidate",
             createdAt: "2023-12-01 10:00:00",
           });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
