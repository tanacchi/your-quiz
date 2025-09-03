# Mutant 3c10ad57 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1991
**Stable ID**: 3c10ad57
**Location**: L215:16–L215:35

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1991
@@ -211,9 +211,9 @@
         const result = suggestStatusPatches(input);
         expect(result).toEqual(expected);
       });
 
-      describe("Patch Application", () => {
+      describe("", () => {
         it("should apply status correction patch correctly", () => {
           const input = { ...validQuizInput, status: "pending" };
           const patches = suggestStatusPatches(input.status);
           const patched = applyEntityPatch(input, patches.at(0) ?? {});
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
