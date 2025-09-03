# Mutant a868f831 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1432
**Stable ID**: a868f831
**Location**: L687:29–L687:40

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1432
@@ -683,9 +683,9 @@
           draft.with({
             id: "quiz-multi-patch",
             question: "  ", // Invalid
             answerType: "bool" as unknown as "boolean", // Invalid
-            solution: { id: "sol-multi", value: true },
+            solution: { id: "", value: true },
             status: "pending_approval", // Invalid
             creatorId: "creator-multi",
             createdAt: "2023-12-01 10:00:00",
           });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
