# Mutant 3f43d188 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4463
**Stable ID**: 3f43d188
**Location**: L368:19–L368:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4463
@@ -364,9 +364,9 @@
         const input = {
           id: "  quiz-123  ",
           question: "  Valid question  ",
           answerType: "single",
-          status: "pending",
+          status: "",
           tagIds: null,
         };
 
         const issues: Issue[] = [
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
