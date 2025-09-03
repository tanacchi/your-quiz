# Mutant 19046bc6 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7547
**Stable ID**: 19046bc6
**Location**: L153:49–L155:10

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7547
@@ -149,11 +149,9 @@
 
       test("should reject invalid matching strategies", () => {
         const invalidStrategies = ["invalid", "", null, undefined];
 
-        invalidStrategies.forEach((strategy) => {
-          expectInvalidParse(zodMatchingStrategySchema, strategy);
-        });
+        invalidStrategies.forEach((strategy) => {});
       });
     });
 
     describe("Quiz Row Schema", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
