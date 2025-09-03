# Mutant 1281afea Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7545
**Stable ID**: 1281afea
**Location**: L151:36–L151:45

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7545
@@ -147,9 +147,9 @@
         });
       });
 
       test("should reject invalid matching strategies", () => {
-        const invalidStrategies = ["invalid", "", null, undefined];
+        const invalidStrategies = ["", "", null, undefined];
 
         invalidStrategies.forEach((strategy) => {
           expectInvalidParse(zodMatchingStrategySchema, strategy);
         });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
