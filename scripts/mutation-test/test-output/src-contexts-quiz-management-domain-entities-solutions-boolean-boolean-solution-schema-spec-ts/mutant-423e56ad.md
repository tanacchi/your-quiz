# Mutant 423e56ad Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5806
**Stable ID**: 423e56ad
**Location**: L80:46–L103:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5806
@@ -76,33 +76,10 @@
         }
       });
     });
 
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
+    describe("Value Field Validation", () => {});
 
-        if (isValid && result.success) {
-          expect(result.data.value).toBe(value);
-          expect(typeof result.data.value).toBe("boolean");
-        }
-      });
-    });
-
     describe("Strict Mode", () => {
       it("should reject data with extra fields", () => {
         const dataWithExtraField = {
           ...validBooleanSolutionData,
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
