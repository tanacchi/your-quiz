# Mutant c7e45e16 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 1431
**Stable ID**: c7e45e16
**Location**: L687:23–L687:55

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1431
@@ -683,9 +683,9 @@
           draft.with({
             id: "quiz-multi-patch",
             question: "  ", // Invalid
             answerType: "bool" as unknown as "boolean", // Invalid
-            solution: { id: "sol-multi", value: true },
+            solution: {},
             status: "pending_approval", // Invalid
             creatorId: "creator-multi",
             createdAt: "2023-12-01 10:00:00",
           });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
