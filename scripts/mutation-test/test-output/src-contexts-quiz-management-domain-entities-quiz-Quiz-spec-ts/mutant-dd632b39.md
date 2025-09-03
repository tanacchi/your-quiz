# Mutant dd632b39 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 1433
**Stable ID**: dd632b39
**Location**: L687:49–L687:53

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1433
@@ -683,9 +683,9 @@
           draft.with({
             id: "quiz-multi-patch",
             question: "  ", // Invalid
             answerType: "bool" as unknown as "boolean", // Invalid
-            solution: { id: "sol-multi", value: true },
+            solution: { id: "sol-multi", value: false },
             status: "pending_approval", // Invalid
             creatorId: "creator-multi",
             createdAt: "2023-12-01 10:00:00",
           });
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
