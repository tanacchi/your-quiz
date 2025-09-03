# Mutant ee2b61ea Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: ArrowFunction
**Original ID**: 7745
**Stable ID**: ee2b61ea
**Location**: L428:55–L429:67

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7745
@@ -424,10 +424,9 @@
           boolean_value: 1,
           min_correct_answers: "2",
         };
 
-        const conversionResult = Result.fromThrowable(() =>
-          toQuizRow(inputWithOptionals as Record<string, unknown>),
+        const conversionResult = Result.fromThrowable(() => undefined,
         )();
 
         expect(conversionResult.isOk()).toBe(true);
       });
```

## Hint

ミューテータ "ArrowFunction" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
