# Mutant 36aea69d Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4417
**Stable ID**: 36aea69d
**Location**: L310:11–L310:47

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4417
@@ -306,9 +306,9 @@
           "pending status without approvedAt",
           { status: "pending_approval", approvedAt: undefined },
         ],
         [
-          "rejected status without approvedAt",
+          "",
           { status: "rejected", approvedAt: undefined },
         ],
         [
           "approved status with approvedAt",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
