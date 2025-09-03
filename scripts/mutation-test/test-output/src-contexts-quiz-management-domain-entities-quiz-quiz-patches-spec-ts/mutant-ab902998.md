# Mutant ab902998 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2061
**Stable ID**: ab902998
**Location**: L331:12–L331:59

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2061
@@ -327,9 +327,9 @@
         expect(result).toEqual([]);
       });
 
       describe("Patch Application", () => {
-        it("should apply default solution patch correctly", () => {
+        it("", () => {
           const mockTimestamp = 1234567890;
           vi.spyOn(Date, "now").mockReturnValue(mockTimestamp);
 
           const input = { ...validQuizInput, solution: null };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
