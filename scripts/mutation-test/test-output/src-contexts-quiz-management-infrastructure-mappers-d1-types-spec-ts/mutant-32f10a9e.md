# Mutant 32f10a9e Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 7770
**Stable ID**: 32f10a9e
**Location**: L467:27–L467:46

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7770
@@ -463,9 +463,9 @@
       });
 
       test("should throw error for invalid input", () => {
         const conversionResult = Result.fromThrowable(() =>
-          toBasicQuizInfo({ invalid: "data" }),
+          toBasicQuizInfo({}),
         )();
 
         expect(conversionResult.isErr()).toBe(true);
       });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
