# Mutant 996ce439 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 1230
**Stable ID**: 996ce439
**Location**: L411:51–L411:55

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1230
@@ -407,9 +407,9 @@
           draft.with({
             id: "quiz-invalid",
             question: "", // Invalid empty question
             answerType: "boolean",
-            solution: { id: "sol-invalid", value: true },
+            solution: { id: "sol-invalid", value: false },
             status: "pending_approval",
             creatorId: "creator-invalid",
             createdAt: "2023-12-01 10:00:00",
           });
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
