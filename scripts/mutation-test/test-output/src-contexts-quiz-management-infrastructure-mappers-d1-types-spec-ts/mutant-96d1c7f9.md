# Mutant 96d1c7f9 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 7599
**Stable ID**: 96d1c7f9
**Location**: L244:29–L244:77

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7599
@@ -240,9 +240,9 @@
         }
       });
 
       test("should reject invalid count data", () => {
-        const invalidData = [{}, { total: null }, { total: "not-a-number" }];
+        const invalidData = [];
 
         invalidData.forEach((data) => {
           expectInvalidParse(zodCountResultSchema, data);
         });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
