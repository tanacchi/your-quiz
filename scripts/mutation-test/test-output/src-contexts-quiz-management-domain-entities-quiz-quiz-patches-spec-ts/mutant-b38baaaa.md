# Mutant b38baaaa Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2037
**Stable ID**: b38baaaa
**Location**: L299:10–L299:66

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2037
@@ -295,9 +295,9 @@
 
         vi.restoreAllMocks();
       });
 
-      it("should handle solution with valid id but invalid value", () => {
+      it("", () => {
         const solutionWithInvalidValue = { id: "valid-id", value: "true" };
         const result = suggestSolutionPatches(solutionWithInvalidValue);
 
         expect(result).toEqual([
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
