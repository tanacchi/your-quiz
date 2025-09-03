# Mutant 3bf6d74a Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7736
**Stable ID**: 3bf6d74a
**Location**: L412:38–L417:10

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7736
@@ -408,14 +408,9 @@
 
         const conversionResult = Result.fromThrowable(() => toQuizRow(input))();
         expect(conversionResult.isOk()).toBe(true);
 
-        if (conversionResult.isOk()) {
-          const result = conversionResult.value;
-          expect(result.id).toBe("123");
-          expect(result.question).toBe("Test question");
-          expect(result.answer_type).toBe("boolean");
-        }
+        if (conversionResult.isOk()) {}
       });
 
       test("should handle optional fields", () => {
         const inputWithOptionals = {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
