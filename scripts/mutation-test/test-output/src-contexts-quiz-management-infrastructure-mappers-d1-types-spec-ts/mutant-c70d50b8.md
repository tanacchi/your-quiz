# Mutant c70d50b8 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7526
**Stable ID**: c70d50b8
**Location**: L127:43–L129:10

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7526
@@ -123,11 +123,9 @@
     describe("Quiz Status Schema", () => {
       test("should validate valid quiz statuses", () => {
         const validStatuses = ["pending_approval", "approved", "rejected"];
 
-        validStatuses.forEach((status) => {
-          expectValidParse(zodQuizStatusSchema, status);
-        });
+        validStatuses.forEach((status) => {});
       });
 
       test("should reject invalid quiz statuses", () => {
         const invalidStatuses = ["invalid", "", null, undefined];
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
