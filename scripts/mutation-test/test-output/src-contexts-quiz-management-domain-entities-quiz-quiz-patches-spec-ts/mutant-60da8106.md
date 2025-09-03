# Mutant 60da8106 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1799
**Stable ID**: 60da8106
**Location**: L140:61–L143:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1799
@@ -136,12 +136,9 @@
           ["valid id", "valid-id", []],
           ["non-string input", 123, []],
         ];
 
-        testCases.forEach(([_testDesc, input, expected]) => {
-          const result = suggester(input);
-          expect(result).toEqual(expected);
-        });
+        testCases.forEach(([_testDesc, input, expected]) => {});
       });
 
       describe("Patch Application", () => {
         it("should apply id trim patch correctly", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
