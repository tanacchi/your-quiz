# Mutant 33d5571e Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4255
**Stable ID**: 33d5571e
**Location**: L164:58–L167:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4255
@@ -160,12 +160,9 @@
         ],
         ["unknown typo", "unknown_type", []],
         ["non-string input", 123, []],
         ["null input", null, []],
-      ])("should handle %s", (_desc, input, expected) => {
-        const result = suggestAnswerTypePatches(input);
-        expect(result).toEqual(expected);
-      });
+      ])("should handle %s", (_desc, input, expected) => {});
 
       describe("Patch Application", () => {
         it("should apply answerType correction patch correctly", () => {
           const input = { ...validQuizSummaryInput, answerType: "single" };
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
