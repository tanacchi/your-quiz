# Mutant 96bb298f Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4423
**Stable ID**: 96bb298f
**Location**: L315:21–L315:31

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4423
@@ -311,9 +311,9 @@
           { status: "rejected", approvedAt: undefined },
         ],
         [
           "approved status with approvedAt",
-          { status: "approved", approvedAt: "2023-12-01T10:00:00.000Z" },
+          { status: "", approvedAt: "2023-12-01T10:00:00.000Z" },
         ],
       ])("should not suggest patch for %s", (_desc, input) => {
         const result = suggestApprovedAtPatches(
           input as Partial<QuizSummaryInput>,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
