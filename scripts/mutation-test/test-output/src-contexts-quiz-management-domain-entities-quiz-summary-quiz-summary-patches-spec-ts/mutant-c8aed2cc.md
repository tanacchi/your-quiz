# Mutant c8aed2cc Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4421
**Stable ID**: c8aed2cc
**Location**: L314:11–L314:44

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4421
@@ -310,9 +310,9 @@
           "rejected status without approvedAt",
           { status: "rejected", approvedAt: undefined },
         ],
         [
-          "approved status with approvedAt",
+          "",
           { status: "approved", approvedAt: "2023-12-01T10:00:00.000Z" },
         ],
       ])("should not suggest patch for %s", (_desc, input) => {
         const result = suggestApprovedAtPatches(
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
