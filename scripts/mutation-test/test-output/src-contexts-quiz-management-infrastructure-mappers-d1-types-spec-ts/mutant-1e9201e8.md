# Mutant 1e9201e8 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7605
**Stable ID**: 1e9201e8
**Location**: L252:46–L267:6

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7605
@@ -248,25 +248,10 @@
         });
       });
     });
 
-    describe("Basic Quiz Info Schema", () => {
-      test("should validate valid basic quiz info", () => {
-        expectValidParse(zodBasicQuizInfoSchema, createValidBasicQuizInfo());
-      });
+    describe("Basic Quiz Info Schema", () => {});
 
-      test("should reject invalid basic quiz info", () => {
-        const requiredFields = ["id", "solution_id", "answer_type"];
-
-        requiredFields.forEach((field) => {
-          const baseInfo = createValidBasicQuizInfo();
-          const invalidInfo = { ...baseInfo };
-          delete (invalidInfo as Record<string, unknown>)[field];
-          expectInvalidParse(zodBasicQuizInfoSchema, invalidInfo);
-        });
-      });
-    });
-
     describe("Parsed Choice Schema", () => {
       test("should validate valid parsed choice", () => {
         expectValidParse(zodParsedChoiceSchema, createValidParsedChoice());
       });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
