# Mutant f13b5843 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7646
**Stable ID**: f13b5843
**Location**: L313:58–L326:8

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7646
@@ -309,22 +309,9 @@
       test("should return true for valid quiz row", () => {
         expect(isQuizRow(createValidQuizRow())).toBe(true);
       });
 
-      test("should return false for invalid data", () => {
-        const invalidInputs = [
-          null,
-          undefined,
-          "string",
-          123,
-          {},
-          { invalid: "data" },
-        ];
-
-        invalidInputs.forEach((input) => {
-          expect(isQuizRow(input)).toBe(false);
-        });
-      });
+      test("should return false for invalid data", () => {});
     });
 
     describe("isCountResult", () => {
       test("should return true for valid count result", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
