# Mutant b16456b0 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7513
**Stable ID**: b16456b0
**Location**: L114:56–L120:8

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7513
@@ -110,15 +110,9 @@
           expectValidParse(zodAnswerTypeSchema, type);
         });
       });
 
-      test("should reject invalid answer types", () => {
-        const invalidTypes = ["invalid", "", null, undefined];
-
-        invalidTypes.forEach((type) => {
-          expectInvalidParse(zodAnswerTypeSchema, type);
-        });
-      });
+      test("should reject invalid answer types", () => {});
     });
 
     describe("Quiz Status Schema", () => {
       test("should validate valid quiz statuses", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
