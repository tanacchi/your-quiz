# Mutant ff4d7277 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1701
**Stable ID**: ff4d7277
**Location**: L56:12–L56:47

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1701
@@ -52,9 +52,9 @@
         expect(result).toEqual(expected);
       });
 
       describe("Patch Application", () => {
-        it("should apply trim patch correctly", () => {
+        it("", () => {
           const input = {
             ...validQuizInput,
             question: "  Untrimmed question?  ",
           };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
