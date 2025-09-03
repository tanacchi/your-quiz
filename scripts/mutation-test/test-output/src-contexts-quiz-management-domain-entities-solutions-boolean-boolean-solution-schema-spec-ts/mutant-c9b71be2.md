# Mutant c9b71be2 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6010
**Stable ID**: c9b71be2
**Location**: L264:69–L275:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #6010
@@ -260,21 +260,10 @@
         }
       });
     });
 
-    it("should work with JSON serialization/deserialization", () => {
-      const originalData = validBooleanSolutionData;
-      const jsonString = JSON.stringify(originalData);
-      const parsedData = JSON.parse(jsonString);
+    it("should work with JSON serialization/deserialization", () => {});
 
-      const result = BooleanSolutionSchema.safeParse(parsedData);
-      expect(result.success).toBe(true);
-
-      if (result.success) {
-        expect(result.data).toEqual(originalData);
-      }
-    });
-
     it("should maintain data integrity through multiple validations", () => {
       let currentData = validBooleanSolutionData;
 
       // Validate multiple times to ensure consistency
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
