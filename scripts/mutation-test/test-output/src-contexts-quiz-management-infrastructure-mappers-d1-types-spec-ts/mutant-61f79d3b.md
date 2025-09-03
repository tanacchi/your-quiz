# Mutant 61f79d3b Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 7734
**Stable ID**: 61f79d3b
**Location**: L412:13–L412:36

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7734
@@ -408,9 +408,9 @@
 
         const conversionResult = Result.fromThrowable(() => toQuizRow(input))();
         expect(conversionResult.isOk()).toBe(true);
 
-        if (conversionResult.isOk()) {
+        if (true) {
           const result = conversionResult.value;
           expect(result.id).toBe("123");
           expect(result.question).toBe("Test question");
           expect(result.answer_type).toBe("boolean");
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
