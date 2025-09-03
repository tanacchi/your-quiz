# Mutant 89bd344f Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 7544
**Stable ID**: 89bd344f
**Location**: L151:35–L151:67

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7544
@@ -147,9 +147,9 @@
         });
       });
 
       test("should reject invalid matching strategies", () => {
-        const invalidStrategies = ["invalid", "", null, undefined];
+        const invalidStrategies = [];
 
         invalidStrategies.forEach((strategy) => {
           expectInvalidParse(zodMatchingStrategySchema, strategy);
         });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
