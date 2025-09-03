# Mutant 9c180f06 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5871
**Stable ID**: 9c180f06
**Location**: L129:40–L147:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5871
@@ -125,28 +125,10 @@
     });
   });
 
   describe("Edge Cases and Boundary Values", () => {
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
+    describe("ID Special Cases", () => {});
 
-        if (result.success) {
-          expect(result.data.id).toBe(id);
-        }
-      });
-    });
-
     describe("Minimal Valid Data", () => {
       it("should accept minimal valid data with single character id", () => {
         const minimalData = {
           id: "s",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
