# Mutant 90a50f5c Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 1729
**Stable ID**: 90a50f5c
**Location**: L93:15–L108:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1729
@@ -89,24 +89,9 @@
       });
     });
 
     describe("suggestExplanationPatches", () => {
-      it.each([
-        [
-          "untrimmed explanation",
-          "  Valid explanation  ",
-          [{ explanation: "Valid explanation" }],
-        ],
-        ["exactly 1000 chars", "A".repeat(1000), []],
-        [
-          "1001 chars",
-          "A".repeat(1001),
-          [{ explanation: `${"A".repeat(997)}...` }],
-        ],
-        ["valid explanation", "Valid explanation", []],
-        ["empty string", "", []],
-        ["non-string input", 123, []],
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
