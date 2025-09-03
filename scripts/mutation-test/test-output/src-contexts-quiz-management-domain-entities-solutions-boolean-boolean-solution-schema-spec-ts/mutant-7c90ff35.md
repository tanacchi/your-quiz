# Mutant 7c90ff35 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5903
**Stable ID**: 7c90ff35
**Location**: L149:42–L177:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5903
@@ -145,38 +145,10 @@
         }
       });
     });
 
-    describe("Minimal Valid Data", () => {
-      it("should accept minimal valid data with single character id", () => {
-        const minimalData = {
-          id: "s",
-          value: true,
-        };
-        const result = BooleanSolutionSchema.safeParse(minimalData);
-        expect(result.success).toBe(true);
+    describe("Minimal Valid Data", () => {});
 
-        if (result.success) {
-          expect(result.data.id).toBe("s");
-          expect(result.data.value).toBe(true);
-        }
-      });
-
-      it("should accept minimal valid data with false value", () => {
-        const minimalData = {
-          id: "s",
-          value: false,
-        };
-        const result = BooleanSolutionSchema.safeParse(minimalData);
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.id).toBe("s");
-          expect(result.data.value).toBe(false);
-        }
-      });
-    });
-
     describe("Type Safety", () => {
       it("should ensure value is exactly boolean type", () => {
         const result = BooleanSolutionSchema.safeParse(
           validBooleanSolutionData,
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
