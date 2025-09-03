# Mutant 8550c5bd Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1993
**Stable ID**: 8550c5bd
**Location**: L216:12–L216:60

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1993
@@ -212,9 +212,9 @@
         expect(result).toEqual(expected);
       });
 
       describe("Patch Application", () => {
-        it("should apply status correction patch correctly", () => {
+        it("", () => {
           const input = { ...validQuizInput, status: "pending" };
           const patches = suggestStatusPatches(input.status);
           const patched = applyEntityPatch(input, patches.at(0) ?? {});
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
