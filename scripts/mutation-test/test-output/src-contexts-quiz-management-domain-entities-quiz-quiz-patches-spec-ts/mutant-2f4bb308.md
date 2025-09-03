# Mutant 2f4bb308 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 1811
**Stable ID**: 2f4bb308
**Location**: L158:15–L174:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1811
@@ -154,25 +154,9 @@
       });
     });
 
     describe("suggestAnswerTypePatches", () => {
-      it.each([
-        ["bool", "bool", [{ answerType: "boolean" }]],
-        ["boolean", "boolean", [{ answerType: "boolean" }]],
-        ["true_false", "true_false", [{ answerType: "boolean" }]],
-        ["truefalse", "truefalse", [{ answerType: "boolean" }]],
-        ["yes_no", "yes_no", [{ answerType: "boolean" }]],
-        ["yesno", "yesno", [{ answerType: "boolean" }]],
-        ["correct_incorrect", "correct_incorrect", [{ answerType: "boolean" }]],
-        ["○×", "○×", [{ answerType: "boolean" }]],
-        ["ox", "ox", [{ answerType: "boolean" }]],
-        ["maru_batsu", "maru_batsu", [{ answerType: "boolean" }]],
-        ["mixed case bool", "BOOL", [{ answerType: "boolean" }]],
-        ["with spaces", " boolean ", [{ answerType: "boolean" }]],
-        ["valid boolean", "boolean", [{ answerType: "boolean" }]],
-        ["unknown type", "single_choice", []],
-        ["non-string input", 123, []],
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
