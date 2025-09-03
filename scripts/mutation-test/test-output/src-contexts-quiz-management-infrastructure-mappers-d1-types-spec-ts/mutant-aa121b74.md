# Mutant aa121b74 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7641
**Stable ID**: aa121b74
**Location**: L308:33–L327:6

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7641
@@ -304,29 +304,10 @@
     });
   });
 
   describe("Type Guards", () => {
-    describe("isQuizRow", () => {
-      test("should return true for valid quiz row", () => {
-        expect(isQuizRow(createValidQuizRow())).toBe(true);
-      });
+    describe("isQuizRow", () => {});
 
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
-    });
-
     describe("isCountResult", () => {
       test("should return true for valid count result", () => {
         expect(isCountResult(createValidCountResult())).toBe(true);
       });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
