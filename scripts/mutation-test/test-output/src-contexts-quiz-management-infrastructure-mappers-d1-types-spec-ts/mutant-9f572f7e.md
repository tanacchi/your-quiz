# Mutant 9f572f7e Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7747
**Stable ID**: 9f572f7e
**Location**: L435:12–L435:50

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7747
@@ -431,9 +431,9 @@
 
         expect(conversionResult.isOk()).toBe(true);
       });
 
-      test("should throw error for invalid input", () => {
+      test("", () => {
         const conversionResult = Result.fromThrowable(() =>
           toQuizRow({ invalid: "data" }),
         )();
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
