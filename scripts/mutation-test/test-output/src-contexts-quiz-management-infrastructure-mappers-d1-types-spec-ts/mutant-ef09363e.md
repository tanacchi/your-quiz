# Mutant ef09363e Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 7750
**Stable ID**: ef09363e
**Location**: L437:21–L437:40

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7750
@@ -433,9 +433,9 @@
       });
 
       test("should throw error for invalid input", () => {
         const conversionResult = Result.fromThrowable(() =>
-          toQuizRow({ invalid: "data" }),
+          toQuizRow({}),
         )();
 
         expect(conversionResult.isErr()).toBe(true);
       });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
