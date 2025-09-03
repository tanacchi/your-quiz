# Mutant 3c47a8b3 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7517
**Stable ID**: 3c47a8b3
**Location**: L117:40–L119:10

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7517
@@ -113,11 +113,9 @@
 
       test("should reject invalid answer types", () => {
         const invalidTypes = ["invalid", "", null, undefined];
 
-        invalidTypes.forEach((type) => {
-          expectInvalidParse(zodAnswerTypeSchema, type);
-        });
+        invalidTypes.forEach((type) => {});
       });
     });
 
     describe("Quiz Status Schema", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
