# Mutant dcd9fb6e Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2059
**Stable ID**: dcd9fb6e
**Location**: L330:16–L330:35

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2059
@@ -326,9 +326,9 @@
         const result = suggestSolutionPatches(validSolution);
         expect(result).toEqual([]);
       });
 
-      describe("Patch Application", () => {
+      describe("", () => {
         it("should apply default solution patch correctly", () => {
           const mockTimestamp = 1234567890;
           vi.spyOn(Date, "now").mockReturnValue(mockTimestamp);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
