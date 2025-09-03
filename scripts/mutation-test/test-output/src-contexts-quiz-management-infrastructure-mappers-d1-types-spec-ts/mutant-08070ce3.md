# Mutant 08070ce3 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 7537
**Stable ID**: 08070ce3
**Location**: L143:33–L143:62

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7537
@@ -139,9 +139,9 @@
     });
 
     describe("Matching Strategy Schema", () => {
       test("should validate valid matching strategies", () => {
-        const validStrategies = ["exact", "partial", "regex"];
+        const validStrategies = [];
 
         validStrategies.forEach((strategy) => {
           expectValidParse(zodMatchingStrategySchema, strategy);
         });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
