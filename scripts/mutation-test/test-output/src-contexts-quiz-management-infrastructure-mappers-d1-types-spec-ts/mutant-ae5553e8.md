# Mutant ae5553e8 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7532
**Stable ID**: ae5553e8
**Location**: L135:45–L137:10

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7532
@@ -131,11 +131,9 @@
 
       test("should reject invalid quiz statuses", () => {
         const invalidStatuses = ["invalid", "", null, undefined];
 
-        invalidStatuses.forEach((status) => {
-          expectInvalidParse(zodQuizStatusSchema, status);
-        });
+        invalidStatuses.forEach((status) => {});
       });
     });
 
     describe("Matching Strategy Schema", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
