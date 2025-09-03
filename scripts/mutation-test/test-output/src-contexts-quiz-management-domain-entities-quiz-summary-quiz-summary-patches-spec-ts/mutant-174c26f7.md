# Mutant 174c26f7 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4415
**Stable ID**: 174c26f7
**Location**: L307:21–L307:39

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4415
@@ -303,9 +303,9 @@
 
       it.each([
         [
           "pending status without approvedAt",
-          { status: "pending_approval", approvedAt: undefined },
+          { status: "", approvedAt: undefined },
         ],
         [
           "rejected status without approvedAt",
           { status: "rejected", approvedAt: undefined },
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
