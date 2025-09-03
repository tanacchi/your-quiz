# Mutant 1139e20b Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 4690
**Stable ID**: 1139e20b
**Location**: L600:31–L603:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4690
@@ -596,12 +596,9 @@
         { question: null, answerType: undefined, status: 123 },
         { id: [], solutionId: {}, creatorId: true },
       ];
 
-      const issues: Issue[] = [
-        { path: ["question"], code: "invalid", message: "Invalid" },
-        { path: ["answerType"], code: "invalid", message: "Invalid" },
-      ];
+      const issues: Issue[] = [];
 
       malformedInputs.forEach((input) => {
         const result = suggestQuizSummaryPatches(input, issues);
         expect(Array.isArray(result)).toBe(true);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
