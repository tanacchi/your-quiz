# Mutant f905f02b Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5912
**Stable ID**: f905f02b
**Location**: L158:29–L161:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5912
@@ -154,12 +154,9 @@
         };
         const result = BooleanSolutionSchema.safeParse(minimalData);
         expect(result.success).toBe(true);
 
-        if (result.success) {
-          expect(result.data.id).toBe("s");
-          expect(result.data.value).toBe(true);
-        }
+        if (result.success) {}
       });
 
       it("should accept minimal valid data with false value", () => {
         const minimalData = {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
