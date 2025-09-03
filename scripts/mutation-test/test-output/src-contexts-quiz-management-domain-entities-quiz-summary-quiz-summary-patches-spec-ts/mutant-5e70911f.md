# Mutant 5e70911f Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4413
**Stable ID**: 5e70911f
**Location**: L306:11–L306:46

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4413
@@ -302,9 +302,9 @@
       });
 
       it.each([
         [
-          "pending status without approvedAt",
+          "",
           { status: "pending_approval", approvedAt: undefined },
         ],
         [
           "rejected status without approvedAt",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
