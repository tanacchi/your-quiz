# Mutant 9ea5fed5 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2140
**Stable ID**: 9ea5fed5
**Location**: L452:44–L455:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2140
@@ -448,12 +448,9 @@
         ];
 
         const nonObjectInputs = [null, undefined, "string", 123, true, []];
 
-        nonObjectInputs.forEach((input) => {
-          const result = suggestQuizPatches(input, issues);
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
