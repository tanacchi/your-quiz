# Mutant ed6684bf Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1899
**Stable ID**: ed6684bf
**Location**: L179:16–L179:35

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1899
@@ -175,9 +175,9 @@
         const result = suggestAnswerTypePatches(input);
         expect(result).toEqual(expected);
       });
 
-      describe("Patch Application", () => {
+      describe("", () => {
         it("should apply boolean correction patch correctly", () => {
           const input = { ...validQuizInput, answerType: "bool" };
           const patches = suggestAnswerTypePatches(input.answerType);
           const patched = applyEntityPatch(input, patches.at(0) ?? {});
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
