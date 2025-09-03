# Mutant e28b406b Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7629
**Stable ID**: e28b406b
**Location**: L289:57–L303:8

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7629
@@ -285,23 +285,9 @@
           expect(parseResult.data.orderIndex).toBe(2);
         }
       });
 
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
+      test("should reject invalid parsed choice", () => {});
     });
   });
 
   describe("Type Guards", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
