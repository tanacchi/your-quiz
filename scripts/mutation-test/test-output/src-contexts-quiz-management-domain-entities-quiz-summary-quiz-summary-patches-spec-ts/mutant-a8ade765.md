# Mutant a8ade765 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4419
**Stable ID**: a8ade765
**Location**: L311:21–L311:31

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4419
@@ -307,9 +307,9 @@
           { status: "pending_approval", approvedAt: undefined },
         ],
         [
           "rejected status without approvedAt",
-          { status: "rejected", approvedAt: undefined },
+          { status: "", approvedAt: undefined },
         ],
         [
           "approved status with approvedAt",
           { status: "approved", approvedAt: "2023-12-01T10:00:00.000Z" },
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
