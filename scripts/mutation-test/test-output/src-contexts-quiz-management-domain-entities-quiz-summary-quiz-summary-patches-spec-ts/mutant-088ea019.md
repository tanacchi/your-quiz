# Mutant 088ea019 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 4201
**Stable ID**: 088ea019
**Location**: L149:15–L164:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4201
@@ -145,24 +145,9 @@
       });
     });
 
     describe("suggestAnswerTypePatches", () => {
-      it.each([
-        ["single typo", "single", [{ answerType: "single_choice" }]],
-        ["multiple typo", "multiple", [{ answerType: "multiple_choice" }]],
-        ["bool typo", "bool", [{ answerType: "boolean" }]],
-        ["boolean_choice typo", "boolean_choice", [{ answerType: "boolean" }]],
-        ["free typo", "free", [{ answerType: "free_text" }]],
-        ["text typo", "text", [{ answerType: "free_text" }]],
-        [
-          "answerType contains free",
-          "free_form",
-          [{ answerType: "free_text" }],
-        ],
-        ["unknown typo", "unknown_type", []],
-        ["non-string input", 123, []],
-        ["null input", null, []],
-      ])("should handle %s", (_desc, input, expected) => {
+      it.each([])("should handle %s", (_desc, input, expected) => {
         const result = suggestAnswerTypePatches(input);
         expect(result).toEqual(expected);
       });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
