# Mutant baca0133 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5848
**Stable ID**: baca0133
**Location**: L93:72–L102:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5848
@@ -89,18 +89,9 @@
         ["undefined value", undefined, false],
         ["empty string", "", false],
         ["object", {}, false],
         ["array", [], false],
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
+      ])("should validate value: %s -> %s", (_desc, value, isValid) => {});
     });
 
     describe("Strict Mode", () => {
       it("should reject data with extra fields", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
