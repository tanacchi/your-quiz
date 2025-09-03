# Mutant a7d891e6 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4455
**Stable ID**: a7d891e6
**Location**: L357:44–L360:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4455
@@ -353,12 +353,9 @@
         ];
 
         const nonObjectInputs = [null, undefined, "string", 123, true, []];
 
-        nonObjectInputs.forEach((input) => {
-          const result = suggestQuizSummaryPatches(input, issues);
-          expect(result).toEqual([]);
-        });
+        nonObjectInputs.forEach((input) => {});
       });
 
       it("should only suggest patches for fields mentioned in issues", () => {
         const input = {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
