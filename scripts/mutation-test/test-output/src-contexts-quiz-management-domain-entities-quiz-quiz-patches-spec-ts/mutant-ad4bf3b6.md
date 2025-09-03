# Mutant ad4bf3b6 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1759
**Stable ID**: ad4bf3b6
**Location**: L108:58–L111:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1759
@@ -104,12 +104,9 @@
         ],
         ["valid explanation", "Valid explanation", []],
         ["empty string", "", []],
         ["non-string input", 123, []],
-      ])("should handle %s", (_desc, input, expected) => {
-        const result = suggestExplanationPatches(input);
-        expect(result).toEqual(expected);
-      });
+      ])("should handle %s", (_desc, input, expected) => {});
 
       describe("Patch Application", () => {
         it("should apply truncation patch correctly", () => {
           const longExplanation = "A".repeat(1001);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
