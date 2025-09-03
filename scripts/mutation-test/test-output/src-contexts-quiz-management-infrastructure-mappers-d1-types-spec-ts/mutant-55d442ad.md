# Mutant 55d442ad Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 7762
**Stable ID**: 55d442ad
**Location**: L457:13–L457:36

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7762
@@ -453,9 +453,9 @@
           toBasicQuizInfo(input),
         )();
         expect(conversionResult.isOk()).toBe(true);
 
-        if (conversionResult.isOk()) {
+        if (false) {
           const result = conversionResult.value;
           expect(result.id).toBe("123");
           expect(result.solution_id).toBe("456");
           expect(result.answer_type).toBe("boolean");
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
