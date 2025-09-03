# Mutant 3fb4bfba Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 4117
**Stable ID**: 3fb4bfba
**Location**: L78:15–L89:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4117
@@ -74,20 +74,9 @@
       });
     });
 
     describe("suggestExplanationPatches", () => {
-      it.each([
-        [
-          "untrimmed explanation",
-          "  Valid explanation  ",
-          [{ explanation: "Valid explanation" }],
-        ],
-        ["valid explanation", "Valid explanation", []],
-        ["empty string", "", []],
-        ["non-string input", 123, []],
-        ["null input", null, []],
-        ["undefined input", undefined, []],
-      ])("should handle %s", (_desc, input, expected) => {
+      it.each([])("should handle %s", (_desc, input, expected) => {
         const result = suggestExplanationPatches(input);
         expect(result).toEqual(expected);
       });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
