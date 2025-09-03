# Mutant a522f34e Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1898
**Stable ID**: a522f34e
**Location**: L174:58–L177:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1898
@@ -170,12 +170,9 @@
         ["with spaces", " boolean ", [{ answerType: "boolean" }]],
         ["valid boolean", "boolean", [{ answerType: "boolean" }]],
         ["unknown type", "single_choice", []],
         ["non-string input", 123, []],
-      ])("should handle %s", (_desc, input, expected) => {
-        const result = suggestAnswerTypePatches(input);
-        expect(result).toEqual(expected);
-      });
+      ])("should handle %s", (_desc, input, expected) => {});
 
       describe("Patch Application", () => {
         it("should apply boolean correction patch correctly", () => {
           const input = { ...validQuizInput, answerType: "bool" };
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
