# Mutant cca96fbb Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 4418
**Stable ID**: cca96fbb
**Location**: L311:11–L311:56

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4418
@@ -307,9 +307,9 @@
           { status: "pending_approval", approvedAt: undefined },
         ],
         [
           "rejected status without approvedAt",
-          { status: "rejected", approvedAt: undefined },
+          {},
         ],
         [
           "approved status with approvedAt",
           { status: "approved", approvedAt: "2023-12-01T10:00:00.000Z" },
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
