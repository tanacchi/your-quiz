# Mutant 0aae4a7f Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7503
**Stable ID**: 0aae4a7f
**Location**: L100:42–L121:6

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7503
@@ -96,31 +96,10 @@
     }
   };
 
   describe("Schema Validation", () => {
-    describe("Answer Type Schema", () => {
-      test("should validate valid answer types", () => {
-        const validTypes = [
-          "boolean",
-          "free_text",
-          "single_choice",
-          "multiple_choice",
-        ];
+    describe("Answer Type Schema", () => {});
 
-        validTypes.forEach((type) => {
-          expectValidParse(zodAnswerTypeSchema, type);
-        });
-      });
-
-      test("should reject invalid answer types", () => {
-        const invalidTypes = ["invalid", "", null, undefined];
-
-        invalidTypes.forEach((type) => {
-          expectInvalidParse(zodAnswerTypeSchema, type);
-        });
-      });
-    });
-
     describe("Quiz Status Schema", () => {
       test("should validate valid quiz statuses", () => {
         const validStatuses = ["pending_approval", "approved", "rejected"];
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
