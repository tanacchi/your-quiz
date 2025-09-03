# Mutant bc482262 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4721
**Stable ID**: bc482262
**Location**: L628:15–L628:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4721
@@ -624,9 +624,9 @@
   describe("Performance and Large Data Handling", () => {
     it("should handle large number of issues efficiently", () => {
       const largeIssues: Issue[] = Array.from({ length: 100 }, (_, i) => ({
         path: ["question"],
-        code: `error-${i}`,
+        code: ``,
         message: `Error ${i}`,
       }));
 
       const result = suggestQuizSummaryPatches(
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
