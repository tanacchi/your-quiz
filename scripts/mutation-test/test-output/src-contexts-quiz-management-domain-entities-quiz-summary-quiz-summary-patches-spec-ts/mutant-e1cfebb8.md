# Mutant e1cfebb8 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4683
**Stable ID**: e1cfebb8
**Location**: L594:8–L594:47

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4683
@@ -590,9 +590,9 @@
       const result = suggestQuizSummaryPatches(validQuizSummaryInput, issues);
       expect(result).toEqual([]);
     });
 
-    it("should handle malformed input objects", () => {
+    it("", () => {
       const malformedInputs = [
         { question: null, answerType: undefined, status: 123 },
         { id: [], solutionId: {}, creatorId: true },
       ];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
