# Mutant e8e28c6a Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 7506
**Stable ID**: e8e28c6a
**Location**: L102:28–L107:10

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7506
@@ -98,14 +98,9 @@
 
   describe("Schema Validation", () => {
     describe("Answer Type Schema", () => {
       test("should validate valid answer types", () => {
-        const validTypes = [
-          "boolean",
-          "free_text",
-          "single_choice",
-          "multiple_choice",
-        ];
+        const validTypes = [];
 
         validTypes.forEach((type) => {
           expectValidParse(zodAnswerTypeSchema, type);
         });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
