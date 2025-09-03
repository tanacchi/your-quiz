# Mutant fb603a1d Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 4061
**Stable ID**: fb603a1d
**Location**: L35:15–L47:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4061
@@ -31,21 +31,9 @@
   };
 
   describe("Individual Patch Suggesters", () => {
     describe("suggestQuestionPatches", () => {
-      it.each([
-        [
-          "untrimmed question",
-          "  Valid question  ",
-          [{ question: "Valid question" }],
-        ],
-        ["question with only spaces", "   ", [{ question: "Sample question" }]],
-        ["empty string", "", [{ question: "Sample question" }]],
-        ["valid question", "Valid question", []],
-        ["non-string input", 123, []],
-        ["null input", null, []],
-        ["undefined input", undefined, []],
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
