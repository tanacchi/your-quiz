# Mutant cec85322 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6021
**Stable ID**: cec85322
**Location**: L281:35–L290:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #6021
@@ -277,18 +277,9 @@
     it("should maintain data integrity through multiple validations", () => {
       let currentData = validBooleanSolutionData;
 
       // Validate multiple times to ensure consistency
-      for (let i = 0; i < 5; i++) {
-        const result = BooleanSolutionSchema.safeParse(currentData);
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          currentData = result.data;
-          expect(currentData.id).toBe(validBooleanSolutionData.id);
-          expect(currentData.value).toBe(validBooleanSolutionData.value);
-        }
-      }
+      for (let i = 0; i < 5; i++) {}
     });
   });
 
   describe("Error Handling", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
