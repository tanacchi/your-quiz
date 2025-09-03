# Mutant 9087e49b Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7553
**Stable ID**: 9087e49b
**Location**: L165:57–L177:8

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7553
@@ -161,22 +161,10 @@
         const validRow = createValidQuizRow();
         expectValidParse(zodQuizRowSchema, validRow);
       });
 
-      test("should handle numeric ID conversion", () => {
-        const baseRow = createValidQuizRow();
-        const rowWithNumericId = {
-          ...baseRow,
-          id: 123,
-        };
-        const parseResult = zodQuizRowSchema.safeParse(rowWithNumericId);
+      test("should handle numeric ID conversion", () => {});
 
-        expect(parseResult.success).toBe(true);
-        if (parseResult.success) {
-          expect(parseResult.data.id).toBe("123");
-        }
-      });
-
       test("should handle optional fields correctly", () => {
         const baseRow = createValidQuizRow();
         const rowWithOptionals = {
           ...baseRow,
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
