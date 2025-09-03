# Mutant 8358c5b0 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 4414
**Stable ID**: 8358c5b0
**Location**: L307:11–L307:64

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4414
@@ -303,9 +303,9 @@
 
       it.each([
         [
           "pending status without approvedAt",
-          { status: "pending_approval", approvedAt: undefined },
+          {},
         ],
         [
           "rejected status without approvedAt",
           { status: "rejected", approvedAt: undefined },
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
