# Mutant 968fbbe0 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7598
**Stable ID**: 968fbbe0
**Location**: L243:54–L249:8

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7598
@@ -239,15 +239,9 @@
           expect(parseResult.data.total).toBe(42);
         }
       });
 
-      test("should reject invalid count data", () => {
-        const invalidData = [{}, { total: null }, { total: "not-a-number" }];
-
-        invalidData.forEach((data) => {
-          expectInvalidParse(zodCountResultSchema, data);
-        });
-      });
+      test("should reject invalid count data", () => {});
     });
 
     describe("Basic Quiz Info Schema", () => {
       test("should validate valid basic quiz info", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
