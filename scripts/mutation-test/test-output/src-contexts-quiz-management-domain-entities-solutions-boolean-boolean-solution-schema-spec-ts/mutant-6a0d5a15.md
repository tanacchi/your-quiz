# Mutant 6a0d5a15 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5856
**Stable ID**: 6a0d5a15
**Location**: L105:35–L125:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5856
@@ -101,29 +101,9 @@
         }
       });
     });
 
-    describe("Strict Mode", () => {
-      it("should reject data with extra fields", () => {
-        const dataWithExtraField = {
-          ...validBooleanSolutionData,
-          extraField: "not allowed",
-        };
-        const result = BooleanSolutionSchema.safeParse(dataWithExtraField);
-        expect(result.success).toBe(false);
-      });
-
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
-    });
+    describe("Strict Mode", () => {});
   });
 
   describe("Edge Cases and Boundary Values", () => {
     describe("ID Special Cases", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
