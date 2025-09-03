# Mutant 71ffcc5e Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4629
**Stable ID**: 71ffcc5e
**Location**: L516:23–L516:39

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4629
@@ -512,9 +512,9 @@
               null,
               123,
             ] as unknown as string[],
             id: "quiz-123",
-            question: "Valid question",
+            question: "",
             answerType: "single_choice" as const,
             solutionId: "solution-456",
             status: "pending_approval" as const,
             creatorId: "creator-789",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
