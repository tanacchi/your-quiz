# Mutant c3289c3a Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 7630
**Stable ID**: c3289c3a
**Location**: L290:32–L296:10

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7630
@@ -286,15 +286,9 @@
         }
       });
 
       test("should reject invalid parsed choice", () => {
-        const requiredFields = [
-          "id",
-          "solutionId",
-          "text",
-          "orderIndex",
-          "isCorrect",
-        ];
+        const requiredFields = [];
 
         requiredFields.forEach((field) => {
           const invalidChoice = { ...createValidParsedChoice() };
           delete (invalidChoice as Record<string, unknown>)[field];
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
