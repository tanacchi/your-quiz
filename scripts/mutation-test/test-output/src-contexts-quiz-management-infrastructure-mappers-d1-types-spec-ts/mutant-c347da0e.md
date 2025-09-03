# Mutant c347da0e Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7771
**Stable ID**: c347da0e
**Location**: L467:38–L467:44

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7771
@@ -463,9 +463,9 @@
       });
 
       test("should throw error for invalid input", () => {
         const conversionResult = Result.fromThrowable(() =>
-          toBasicQuizInfo({ invalid: "data" }),
+          toBasicQuizInfo({ invalid: "" }),
         )();
 
         expect(conversionResult.isErr()).toBe(true);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
