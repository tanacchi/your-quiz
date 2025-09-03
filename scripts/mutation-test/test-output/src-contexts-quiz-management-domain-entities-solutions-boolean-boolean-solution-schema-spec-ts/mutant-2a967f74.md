# Mutant 2a967f74 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5863
**Stable ID**: 2a967f74
**Location**: L115:63–L124:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5863
@@ -111,18 +111,9 @@
         const result = BooleanSolutionSchema.safeParse(dataWithExtraField);
         expect(result.success).toBe(false);
       });
 
-      it("should reject data with nested extra fields", () => {
-        const dataWithNestedExtra = {
-          ...validBooleanSolutionData,
-          metadata: {
-            extra: "field",
-          },
-        };
-        const result = BooleanSolutionSchema.safeParse(dataWithNestedExtra);
-        expect(result.success).toBe(false);
-      });
+      it("should reject data with nested extra fields", () => {});
     });
   });
 
   describe("Edge Cases and Boundary Values", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
