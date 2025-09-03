# Mutant c1545a65 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7521
**Stable ID**: c1545a65
**Location**: L124:57–L130:8

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7521
@@ -120,16 +120,10 @@
       });
     });
 
     describe("Quiz Status Schema", () => {
-      test("should validate valid quiz statuses", () => {
-        const validStatuses = ["pending_approval", "approved", "rejected"];
+      test("should validate valid quiz statuses", () => {});
 
-        validStatuses.forEach((status) => {
-          expectValidParse(zodQuizStatusSchema, status);
-        });
-      });
-
       test("should reject invalid quiz statuses", () => {
         const invalidStatuses = ["invalid", "", null, undefined];
 
         invalidStatuses.forEach((status) => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
