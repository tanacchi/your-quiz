# Mutant da707910 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7546
**Stable ID**: da707910
**Location**: L151:47–L151:49

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7546
@@ -147,9 +147,9 @@
         });
       });
 
       test("should reject invalid matching strategies", () => {
-        const invalidStrategies = ["invalid", "", null, undefined];
+        const invalidStrategies = ["invalid", "Stryker was here!", null, undefined];
 
         invalidStrategies.forEach((strategy) => {
           expectInvalidParse(zodMatchingStrategySchema, strategy);
         });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
