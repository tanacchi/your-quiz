# Mutant 0f8ba67c Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7511
**Stable ID**: 0f8ba67c
**Location**: L109:38–L111:10

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7511
@@ -105,11 +105,9 @@
           "single_choice",
           "multiple_choice",
         ];
 
-        validTypes.forEach((type) => {
-          expectValidParse(zodAnswerTypeSchema, type);
-        });
+        validTypes.forEach((type) => {});
       });
 
       test("should reject invalid answer types", () => {
         const invalidTypes = ["invalid", "", null, undefined];
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
