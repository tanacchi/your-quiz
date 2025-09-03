# Mutant a6a903a3 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4142
**Stable ID**: a6a903a3
**Location**: L89:58–L92:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4142
@@ -85,12 +85,9 @@
         ["empty string", "", []],
         ["non-string input", 123, []],
         ["null input", null, []],
         ["undefined input", undefined, []],
-      ])("should handle %s", (_desc, input, expected) => {
-        const result = suggestExplanationPatches(input);
-        expect(result).toEqual(expected);
-      });
+      ])("should handle %s", (_desc, input, expected) => {});
 
       describe("Patch Application", () => {
         it("should apply trim patch correctly", () => {
           const input = {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
