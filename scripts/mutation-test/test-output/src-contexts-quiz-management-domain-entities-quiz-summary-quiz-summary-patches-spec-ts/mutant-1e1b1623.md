# Mutant 1e1b1623 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4094
**Stable ID**: 1e1b1623
**Location**: L47:58–L50:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4094
@@ -43,12 +43,9 @@
         ["valid question", "Valid question", []],
         ["non-string input", 123, []],
         ["null input", null, []],
         ["undefined input", undefined, []],
-      ])("should handle %s", (_desc, input, expected) => {
-        const result = suggestQuestionPatches(input);
-        expect(result).toEqual(expected);
-      });
+      ])("should handle %s", (_desc, input, expected) => {});
 
       describe("Patch Application", () => {
         it("should apply trim patch correctly", () => {
           const input = { ...validQuizSummaryInput, question: "  Untrimmed  " };
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
