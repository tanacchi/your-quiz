# Mutant c8b68aad Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7617
**Stable ID**: c8b68aad
**Location**: L269:44–L304:6

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7617
@@ -265,44 +265,9 @@
         });
       });
     });
 
-    describe("Parsed Choice Schema", () => {
-      test("should validate valid parsed choice", () => {
-        expectValidParse(zodParsedChoiceSchema, createValidParsedChoice());
-      });
-
-      test("should handle orderIndex conversion", () => {
-        const choiceWithStringIndex = {
-          ...createValidParsedChoice(),
-          orderIndex: "2",
-        };
-        const parseResult = zodParsedChoiceSchema.safeParse(
-          choiceWithStringIndex,
-        );
-
-        expect(parseResult.success).toBe(true);
-        if (parseResult.success) {
-          expect(parseResult.data.orderIndex).toBe(2);
-        }
-      });
-
-      test("should reject invalid parsed choice", () => {
-        const requiredFields = [
-          "id",
-          "solutionId",
-          "text",
-          "orderIndex",
-          "isCorrect",
-        ];
-
-        requiredFields.forEach((field) => {
-          const invalidChoice = { ...createValidParsedChoice() };
-          delete (invalidChoice as Record<string, unknown>)[field];
-          expectInvalidParse(zodParsedChoiceSchema, invalidChoice);
-        });
-      });
-    });
+    describe("Parsed Choice Schema", () => {});
   });
 
   describe("Type Guards", () => {
     describe("isQuizRow", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
