# Mutant 4f75bf9a Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7797
**Stable ID**: 4f75bf9a
**Location**: L509:47–L509:49

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7797
@@ -505,9 +505,9 @@
       expect(executionTime).toBeLessThan(100); // Should complete within 100ms
     });
 
     test("should handle edge cases gracefully", () => {
-      const edgeCases = [{}, null, undefined, "", 123, []];
+      const edgeCases = [{}, null, undefined, "Stryker was here!", 123, []];
 
       edgeCases.forEach((input) => {
         expect(isQuizRow(input)).toBe(false);
         expect(isCountResult(input)).toBe(false);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
