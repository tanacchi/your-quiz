# Mutant 1614e4cc Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7574
**Stable ID**: 1614e4cc
**Location**: L208:59–L225:8

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7574
@@ -204,26 +204,9 @@
 
         expectValidParse(zodQuizRowSchema, rowWithNulls);
       });
 
-      test("should reject missing required fields", () => {
-        const requiredFields = [
-          "id",
-          "question",
-          "answer_type",
-          "solution_id",
-          "status",
-          "creator_id",
-          "created_at",
-        ];
-
-        requiredFields.forEach((field) => {
-          const baseRow = createValidQuizRow();
-          const invalidRow = { ...baseRow };
-          delete (invalidRow as Record<string, unknown>)[field];
-          expectInvalidParse(zodQuizRowSchema, invalidRow);
-        });
-      });
+      test("should reject missing required fields", () => {});
     });
 
     describe("Count Result Schema", () => {
       test("should validate valid count result", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
