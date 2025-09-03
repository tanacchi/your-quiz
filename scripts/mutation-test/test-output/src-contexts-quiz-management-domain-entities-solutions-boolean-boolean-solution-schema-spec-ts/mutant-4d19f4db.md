# Mutant 4d19f4db Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 5994
**Stable ID**: 4d19f4db
**Location**: L238:32–L251:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5994
@@ -234,22 +234,9 @@
       });
     });
 
     it("should handle solutions with complex IDs", () => {
-      const complexSolutions = [
-        {
-          id: "quiz-123-solution-456-boolean-true",
-          value: true,
-        },
-        {
-          id: "550e8400-e29b-41d4-a716-446655440000",
-          value: false,
-        },
-        {
-          id: "solution_with_underscores_and_numbers_123",
-          value: true,
-        },
-      ];
+      const complexSolutions = [];
 
       complexSolutions.forEach((solution) => {
         const result = BooleanSolutionSchema.safeParse(solution);
         expect(result.success).toBe(true);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
