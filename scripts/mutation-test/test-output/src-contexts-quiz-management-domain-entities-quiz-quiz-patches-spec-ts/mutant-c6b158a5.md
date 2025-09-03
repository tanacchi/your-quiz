# Mutant c6b158a5 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 1657
**Stable ID**: c6b158a5
**Location**: L37:15–L50:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1657
@@ -33,22 +33,9 @@
   };
 
   describe("Individual Patch Suggesters", () => {
     describe("suggestQuestionPatches", () => {
-      it.each([
-        [
-          "untrimmed question",
-          "  Valid question?  ",
-          [{ question: "Valid question?" }],
-        ],
-        ["empty string", "", [{ question: "Sample boolean question?" }]],
-        ["only whitespace", "   ", [{ question: "Sample boolean question?" }]],
-        ["exactly 500 chars", "A".repeat(500), []],
-        ["501 chars", "A".repeat(501), [{ question: `${"A".repeat(497)}...` }]],
-        ["valid question", "Valid question?", []],
-        ["non-string input", 123, []],
-        ["null input", null, []],
-      ])("should handle %s", (_desc, input, expected) => {
+      it.each([])("should handle %s", (_desc, input, expected) => {
         const result = suggestQuestionPatches(input);
         expect(result).toEqual(expected);
       });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
