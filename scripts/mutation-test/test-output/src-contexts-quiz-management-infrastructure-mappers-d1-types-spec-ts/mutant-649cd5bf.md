# Mutant 649cd5bf Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7621
**Stable ID**: 649cd5bf
**Location**: L274:57–L287:8

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7621
@@ -270,23 +270,10 @@
       test("should validate valid parsed choice", () => {
         expectValidParse(zodParsedChoiceSchema, createValidParsedChoice());
       });
 
-      test("should handle orderIndex conversion", () => {
-        const choiceWithStringIndex = {
-          ...createValidParsedChoice(),
-          orderIndex: "2",
-        };
-        const parseResult = zodParsedChoiceSchema.safeParse(
-          choiceWithStringIndex,
-        );
+      test("should handle orderIndex conversion", () => {});
 
-        expect(parseResult.success).toBe(true);
-        if (parseResult.success) {
-          expect(parseResult.data.orderIndex).toBe(2);
-        }
-      });
-
       test("should reject invalid parsed choice", () => {
         const requiredFields = [
           "id",
           "solutionId",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
