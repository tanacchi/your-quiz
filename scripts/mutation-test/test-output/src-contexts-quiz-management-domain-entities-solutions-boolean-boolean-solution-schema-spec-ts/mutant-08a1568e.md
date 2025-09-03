# Mutant 08a1568e Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5927
**Stable ID**: 08a1568e
**Location**: L179:35–L211:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5927
@@ -175,41 +175,9 @@
         }
       });
     });
 
-    describe("Type Safety", () => {
-      it("should ensure value is exactly boolean type", () => {
-        const result = BooleanSolutionSchema.safeParse(
-          validBooleanSolutionData,
-        );
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(typeof result.data.value).toBe("boolean");
-          expect(
-            result.data.value === true || result.data.value === false,
-          ).toBe(true);
-        }
-      });
-
-      it("should preserve boolean type across multiple validations", () => {
-        const trueData = { id: "test-true", value: true };
-        const falseData = { id: "test-false", value: false };
-
-        const trueResult = BooleanSolutionSchema.safeParse(trueData);
-        const falseResult = BooleanSolutionSchema.safeParse(falseData);
-
-        expect(trueResult.success).toBe(true);
-        expect(falseResult.success).toBe(true);
-
-        if (trueResult.success && falseResult.success) {
-          expect(trueResult.data.value).toBe(true);
-          expect(falseResult.data.value).toBe(false);
-          expect(typeof trueResult.data.value).toBe("boolean");
-          expect(typeof falseResult.data.value).toBe("boolean");
-        }
-      });
-    });
+    describe("Type Safety", () => {});
   });
 
   describe("Integration Scenarios", () => {
     it("should handle typical quiz solution scenarios", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
