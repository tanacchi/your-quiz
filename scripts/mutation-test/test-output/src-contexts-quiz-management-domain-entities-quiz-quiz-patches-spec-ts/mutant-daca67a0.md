# Mutant daca67a0 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2001
**Stable ID**: daca67a0
**Location**: L227:10–L227:39

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2001
@@ -223,9 +223,9 @@
       });
     });
 
     describe("suggestSolutionPatches", () => {
-      it("should handle null solution", () => {
+      it("", () => {
         const mockTimestamp = 1234567890;
         vi.spyOn(Date, "now").mockReturnValue(mockTimestamp);
 
         const result = suggestSolutionPatches(null);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
