# Mutant 2b17d640 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5993
**Stable ID**: 2b17d640
**Location**: L237:58–L262:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5993
@@ -233,35 +233,10 @@
         }
       });
     });
 
-    it("should handle solutions with complex IDs", () => {
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
+    it("should handle solutions with complex IDs", () => {});
 
-      complexSolutions.forEach((solution) => {
-        const result = BooleanSolutionSchema.safeParse(solution);
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.id).toBe(solution.id);
-          expect(result.data.value).toBe(solution.value);
-        }
-      });
-    });
-
     it("should work with JSON serialization/deserialization", () => {
       const originalData = validBooleanSolutionData;
       const jsonString = JSON.stringify(originalData);
       const parsedData = JSON.parse(jsonString);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
