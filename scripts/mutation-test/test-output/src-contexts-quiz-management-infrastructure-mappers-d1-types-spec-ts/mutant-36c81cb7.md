# Mutant 36c81cb7 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7614
**Stable ID**: 36c81cb7
**Location**: L260:43–L265:10

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7614
@@ -256,14 +256,9 @@
 
       test("should reject invalid basic quiz info", () => {
         const requiredFields = ["id", "solution_id", "answer_type"];
 
-        requiredFields.forEach((field) => {
-          const baseInfo = createValidBasicQuizInfo();
-          const invalidInfo = { ...baseInfo };
-          delete (invalidInfo as Record<string, unknown>)[field];
-          expectInvalidParse(zodBasicQuizInfoSchema, invalidInfo);
-        });
+        requiredFields.forEach((field) => {});
       });
     });
 
     describe("Parsed Choice Schema", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
