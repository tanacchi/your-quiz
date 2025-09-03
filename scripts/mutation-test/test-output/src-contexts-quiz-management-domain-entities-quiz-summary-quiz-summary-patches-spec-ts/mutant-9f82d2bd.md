# Mutant 9f82d2bd Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 4697
**Stable ID**: 9f82d2bd
**Location**: L602:17–L602:31

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4697
@@ -598,9 +598,9 @@
       ];
 
       const issues: Issue[] = [
         { path: ["question"], code: "invalid", message: "Invalid" },
-        { path: ["answerType"], code: "invalid", message: "Invalid" },
+        { path: [], code: "invalid", message: "Invalid" },
       ];
 
       malformedInputs.forEach((input) => {
         const result = suggestQuizSummaryPatches(input, issues);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
