# Mutant c98268e9 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7751
**Stable ID**: c98268e9
**Location**: L437:32–L437:38

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7751
@@ -433,9 +433,9 @@
       });
 
       test("should throw error for invalid input", () => {
         const conversionResult = Result.fromThrowable(() =>
-          toQuizRow({ invalid: "data" }),
+          toQuizRow({ invalid: "" }),
         )();
 
         expect(conversionResult.isErr()).toBe(true);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
