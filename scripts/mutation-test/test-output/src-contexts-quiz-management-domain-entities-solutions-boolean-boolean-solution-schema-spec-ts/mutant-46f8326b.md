# Mutant 46f8326b Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5722
**Stable ID**: 46f8326b
**Location**: L14:54–L126:4

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5722
@@ -10,122 +10,10 @@
     id: "solution-123",
     value: true,
   };
 
-  describe("BooleanSolutionSchema Validation", () => {
-    describe("Required Fields", () => {
-      it("should accept valid boolean solution with true value", () => {
-        const result = BooleanSolutionSchema.safeParse(
-          validBooleanSolutionData,
-        );
-        expect(result.success).toBe(true);
+  describe("BooleanSolutionSchema Validation", () => {});
 
-        if (result.success) {
-          const data = result.data as BooleanSolutionData;
-          expect(data.id).toBe(validBooleanSolutionData.id);
-          expect(data.value).toBe(true);
-        }
-      });
-
-      it("should accept valid boolean solution with false value", () => {
-        const falseValueData = {
-          ...validBooleanSolutionData,
-          value: false,
-        };
-        const result = BooleanSolutionSchema.safeParse(falseValueData);
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.value).toBe(false);
-        }
-      });
-
-      it.each([
-        ["id", { ...validBooleanSolutionData, id: undefined }],
-        ["value", { ...validBooleanSolutionData, value: undefined }],
-      ])("should reject missing required field: %s", (_field, invalidData) => {
-        const result = BooleanSolutionSchema.safeParse(invalidData);
-        expect(result.success).toBe(false);
-      });
-    });
-
-    describe("ID Field Validation", () => {
-      it.each([
-        ["valid alphanumeric", "solution-123", true],
-        ["valid with underscore", "solution_test", true],
-        ["valid uuid format", "550e8400-e29b-41d4-a716-446655440000", true],
-        ["valid single char", "s", true],
-        [
-          "valid long id",
-          "solution-very-long-identifier-with-many-parts",
-          true,
-        ],
-        ["empty string", "", false],
-        ["only whitespace", "   ", true],
-        ["null value", null, false],
-        ["undefined value", undefined, false],
-        ["number", 123, false],
-        ["object", {}, false],
-        ["boolean", true, false],
-      ])("should validate id: %s -> %s", (_desc, id, isValid) => {
-        const data = { ...validBooleanSolutionData, id };
-        const result = BooleanSolutionSchema.safeParse(data);
-        expect(result.success).toBe(isValid);
-
-        if (isValid && result.success) {
-          expect(result.data.id).toBe(id);
-        }
-      });
-    });
-
-    describe("Value Field Validation", () => {
-      it.each([
-        ["true boolean", true, true],
-        ["false boolean", false, true],
-        ["string 'true'", "true", false],
-        ["string 'false'", "false", false],
-        ["number 1", 1, false],
-        ["number 0", 0, false],
-        ["null value", null, false],
-        ["undefined value", undefined, false],
-        ["empty string", "", false],
-        ["object", {}, false],
-        ["array", [], false],
-      ])("should validate value: %s -> %s", (_desc, value, isValid) => {
-        const data = { ...validBooleanSolutionData, value };
-        const result = BooleanSolutionSchema.safeParse(data);
-        expect(result.success).toBe(isValid);
-
-        if (isValid && result.success) {
-          expect(result.data.value).toBe(value);
-          expect(typeof result.data.value).toBe("boolean");
-        }
-      });
-    });
-
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
-  });
-
   describe("Edge Cases and Boundary Values", () => {
     describe("ID Special Cases", () => {
       it.each([
         ["special characters", "solution-!@#$%^&*()"],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
