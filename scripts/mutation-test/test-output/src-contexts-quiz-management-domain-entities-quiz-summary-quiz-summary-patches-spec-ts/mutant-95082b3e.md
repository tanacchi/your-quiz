# Mutant 95082b3e Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 4454
**Stable ID**: 95082b3e
**Location**: L355:72–L355:74

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4454
@@ -351,9 +351,9 @@
         const issues: Issue[] = [
           { path: ["question"], code: "invalid", message: "Invalid" },
         ];
 
-        const nonObjectInputs = [null, undefined, "string", 123, true, []];
+        const nonObjectInputs = [null, undefined, "string", 123, true, ["Stryker was here"]];
 
         nonObjectInputs.forEach((input) => {
           const result = suggestQuizSummaryPatches(input, issues);
           expect(result).toEqual([]);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
