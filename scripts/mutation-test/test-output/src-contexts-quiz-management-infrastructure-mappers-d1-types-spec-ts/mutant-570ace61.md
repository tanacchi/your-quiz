# Mutant 570ace61 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 7601
**Stable ID**: 570ace61
**Location**: L244:51–L244:76

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7601
@@ -240,9 +240,9 @@
         }
       });
 
       test("should reject invalid count data", () => {
-        const invalidData = [{}, { total: null }, { total: "not-a-number" }];
+        const invalidData = [{}, { total: null }, {}];
 
         invalidData.forEach((data) => {
           expectInvalidParse(zodCountResultSchema, data);
         });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
