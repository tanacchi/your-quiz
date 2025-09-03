# Mutant a6ee659e Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4186
**Stable ID**: a6ee659e
**Location**: L128:61–L131:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4186
@@ -124,12 +124,9 @@
           ["empty string", "", []],
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
