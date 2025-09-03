# Mutant fc858985 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7528
**Stable ID**: fc858985
**Location**: L132:57–L138:8

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7528
@@ -128,15 +128,9 @@
           expectValidParse(zodQuizStatusSchema, status);
         });
       });
 
-      test("should reject invalid quiz statuses", () => {
-        const invalidStatuses = ["invalid", "", null, undefined];
-
-        invalidStatuses.forEach((status) => {
-          expectInvalidParse(zodQuizStatusSchema, status);
-        });
-      });
+      test("should reject invalid quiz statuses", () => {});
     });
 
     describe("Matching Strategy Schema", () => {
       test("should validate valid matching strategies", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
