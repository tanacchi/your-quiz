# Mutant 0cb5f68a Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 7798
**Stable ID**: 0cb5f68a
**Location**: L509:56–L509:58

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7798
@@ -505,9 +505,9 @@
       expect(executionTime).toBeLessThan(100); // Should complete within 100ms
     });
 
     test("should handle edge cases gracefully", () => {
-      const edgeCases = [{}, null, undefined, "", 123, []];
+      const edgeCases = [{}, null, undefined, "", 123, ["Stryker was here"]];
 
       edgeCases.forEach((input) => {
         expect(isQuizRow(input)).toBe(false);
         expect(isCountResult(input)).toBe(false);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
