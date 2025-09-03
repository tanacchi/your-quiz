# Mutant e15dd969 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 7761
**Stable ID**: e15dd969
**Location**: L457:13–L457:36

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7761
@@ -453,9 +453,9 @@
           toBasicQuizInfo(input),
         )();
         expect(conversionResult.isOk()).toBe(true);
 
-        if (conversionResult.isOk()) {
+        if (true) {
           const result = conversionResult.value;
           expect(result.id).toBe("123");
           expect(result.solution_id).toBe("456");
           expect(result.answer_type).toBe("boolean");
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
