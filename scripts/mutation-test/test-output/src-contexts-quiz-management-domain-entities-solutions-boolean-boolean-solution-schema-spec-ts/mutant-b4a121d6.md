# Mutant b4a121d6 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5869
**Stable ID**: b4a121d6
**Location**: L128:52–L212:4

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5869
@@ -124,94 +124,10 @@
       });
     });
   });
 
-  describe("Edge Cases and Boundary Values", () => {
-    describe("ID Special Cases", () => {
-      it.each([
-        ["special characters", "solution-!@#$%^&*()"],
-        ["unicode characters", "solution-プログラミング"],
-        ["emoji", "solution-🚀"],
-        ["very long id", `solution-${"a".repeat(100)}`],
-        ["mixed case", "Solution-MixedCase-123"],
-        ["numbers only", "123456789"],
-        ["dots and dashes", "solution.test-case.123"],
-      ])("should handle id with %s", (_desc, id) => {
-        const data = { ...validBooleanSolutionData, id };
-        const result = BooleanSolutionSchema.safeParse(data);
-        expect(result.success).toBe(true);
+  describe("Edge Cases and Boundary Values", () => {});
 
-        if (result.success) {
-          expect(result.data.id).toBe(id);
-        }
-      });
-    });
-
-    describe("Minimal Valid Data", () => {
-      it("should accept minimal valid data with single character id", () => {
-        const minimalData = {
-          id: "s",
-          value: true,
-        };
-        const result = BooleanSolutionSchema.safeParse(minimalData);
-        expect(result.success).toBe(true);
-
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
-  });
-
   describe("Integration Scenarios", () => {
     it("should handle typical quiz solution scenarios", () => {
       const quizSolutions = [
         { id: "solution-correct-answer", value: true },
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
