# Mutant 9d4efd8f Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4452
**Stable ID**: 9d4efd8f
**Location**: L355:51–L355:59

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4452
@@ -351,9 +351,9 @@
         const issues: Issue[] = [
           { path: ["question"], code: "invalid", message: "Invalid" },
         ];
 
-        const nonObjectInputs = [null, undefined, "string", 123, true, []];
+        const nonObjectInputs = [null, undefined, "", 123, true, []];
 
         nonObjectInputs.forEach((input) => {
           const result = suggestQuizSummaryPatches(input, issues);
           expect(result).toEqual([]);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
