# Mutant 1a4ef245 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1489
**Stable ID**: 1a4ef245
**Location**: L777:29–L777:40

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1489
@@ -773,9 +773,9 @@
           draft.with({
             id: "quiz-patch-error",
             question: "Patch error test?",
             answerType: "boolean",
-            solution: { id: "sol-error", value: true },
+            solution: { id: "", value: true },
             status: "pending_approval",
             creatorId: "creator-error",
             createdAt: "2023-12-01 10:00:00",
           });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
