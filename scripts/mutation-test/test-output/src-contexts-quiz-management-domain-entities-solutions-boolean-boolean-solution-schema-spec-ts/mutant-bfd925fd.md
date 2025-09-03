# Mutant bfd925fd Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5990
**Stable ID**: bfd925fd
**Location**: L229:29–L233:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5990
@@ -225,13 +225,9 @@
       quizSolutions.forEach((solution, _index) => {
         const result = BooleanSolutionSchema.safeParse(solution);
         expect(result.success).toBe(true);
 
-        if (result.success) {
-          expect(result.data.id).toBe(solution.id);
-          expect(result.data.value).toBe(solution.value);
-          expect(typeof result.data.value).toBe("boolean");
-        }
+        if (result.success) {}
       });
     });
 
     it("should handle solutions with complex IDs", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
