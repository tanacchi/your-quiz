# Mutant 32f0120d Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 7735
**Stable ID**: 32f0120d
**Location**: L412:13–L412:36

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7735
@@ -408,9 +408,9 @@
 
         const conversionResult = Result.fromThrowable(() => toQuizRow(input))();
         expect(conversionResult.isOk()).toBe(true);
 
-        if (conversionResult.isOk()) {
+        if (false) {
           const result = conversionResult.value;
           expect(result.id).toBe("123");
           expect(result.question).toBe("Test question");
           expect(result.answer_type).toBe("boolean");
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
