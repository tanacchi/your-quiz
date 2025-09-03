# Mutant 59a6343f Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5730
**Stable ID**: 59a6343f
**Location**: L22:29–L26:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5730
@@ -18,13 +18,9 @@
           validBooleanSolutionData,
         );
         expect(result.success).toBe(true);
 
-        if (result.success) {
-          const data = result.data as BooleanSolutionData;
-          expect(data.id).toBe(validBooleanSolutionData.id);
-          expect(data.value).toBe(true);
-        }
+        if (result.success) {}
       });
 
       it("should accept valid boolean solution with false value", () => {
         const falseValueData = {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
