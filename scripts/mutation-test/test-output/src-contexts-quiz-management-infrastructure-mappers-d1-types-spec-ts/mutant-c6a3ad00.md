# Mutant c6a3ad00 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7794
**Stable ID**: c6a3ad00
**Location**: L508:10–L508:47

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7794
@@ -504,9 +504,9 @@
       const executionTime = endTime - startTime;
       expect(executionTime).toBeLessThan(100); // Should complete within 100ms
     });
 
-    test("should handle edge cases gracefully", () => {
+    test("", () => {
       const edgeCases = [{}, null, undefined, "", 123, []];
 
       edgeCases.forEach((input) => {
         expect(isQuizRow(input)).toBe(false);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
