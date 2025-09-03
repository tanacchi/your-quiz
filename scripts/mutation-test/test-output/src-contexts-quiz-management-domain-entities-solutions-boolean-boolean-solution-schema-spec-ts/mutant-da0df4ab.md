# Mutant da0df4ab Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5739
**Stable ID**: da0df4ab
**Location**: L37:29–L39:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5739
@@ -33,11 +33,9 @@
         };
         const result = BooleanSolutionSchema.safeParse(falseValueData);
         expect(result.success).toBe(true);
 
-        if (result.success) {
-          expect(result.data.value).toBe(false);
-        }
+        if (result.success) {}
       });
 
       it.each([
         ["id", { ...validBooleanSolutionData, id: undefined }],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
