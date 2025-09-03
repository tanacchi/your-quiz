# Mutant 8334cbf9 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7519
**Stable ID**: 8334cbf9
**Location**: L123:42–L139:6

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7519
@@ -119,26 +119,10 @@
         });
       });
     });
 
-    describe("Quiz Status Schema", () => {
-      test("should validate valid quiz statuses", () => {
-        const validStatuses = ["pending_approval", "approved", "rejected"];
+    describe("Quiz Status Schema", () => {});
 
-        validStatuses.forEach((status) => {
-          expectValidParse(zodQuizStatusSchema, status);
-        });
-      });
-
-      test("should reject invalid quiz statuses", () => {
-        const invalidStatuses = ["invalid", "", null, undefined];
-
-        invalidStatuses.forEach((status) => {
-          expectInvalidParse(zodQuizStatusSchema, status);
-        });
-      });
-    });
-
     describe("Matching Strategy Schema", () => {
       test("should validate valid matching strategies", () => {
         const validStrategies = ["exact", "partial", "regex"];
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
