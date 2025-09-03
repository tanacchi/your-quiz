# Mutant 9f4c0476 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6004
**Stable ID**: 9f4c0476
**Location**: L253:46–L261:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #6004
@@ -249,17 +249,9 @@
           value: true,
         },
       ];
 
-      complexSolutions.forEach((solution) => {
-        const result = BooleanSolutionSchema.safeParse(solution);
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.id).toBe(solution.id);
-          expect(result.data.value).toBe(solution.value);
-        }
-      });
+      complexSolutions.forEach((solution) => {});
     });
 
     it("should work with JSON serialization/deserialization", () => {
       const originalData = validBooleanSolutionData;
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
