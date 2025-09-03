# Mutant 512b8f45 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7603
**Stable ID**: 512b8f45
**Location**: L246:39–L248:10

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7603
@@ -242,11 +242,9 @@
 
       test("should reject invalid count data", () => {
         const invalidData = [{}, { total: null }, { total: "not-a-number" }];
 
-        invalidData.forEach((data) => {
-          expectInvalidParse(zodCountResultSchema, data);
-        });
+        invalidData.forEach((data) => {});
       });
     });
 
     describe("Basic Quiz Info Schema", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
