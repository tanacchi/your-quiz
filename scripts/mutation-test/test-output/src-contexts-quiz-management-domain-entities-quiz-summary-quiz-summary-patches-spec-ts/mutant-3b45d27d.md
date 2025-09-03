# Mutant 3b45d27d Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4425
**Stable ID**: 3b45d27d
**Location**: L317:10–L317:43

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4425
@@ -313,9 +313,9 @@
         [
           "approved status with approvedAt",
           { status: "approved", approvedAt: "2023-12-01T10:00:00.000Z" },
         ],
-      ])("should not suggest patch for %s", (_desc, input) => {
+      ])("", (_desc, input) => {
         const result = suggestApprovedAtPatches(
           input as Partial<QuizSummaryInput>,
         );
         expect(result).toEqual([]);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
