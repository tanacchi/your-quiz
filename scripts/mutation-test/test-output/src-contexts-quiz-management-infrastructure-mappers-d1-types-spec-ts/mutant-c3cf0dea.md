# Mutant c3cf0dea Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7536
**Stable ID**: c3cf0dea
**Location**: L142:63–L148:8

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7536
@@ -138,16 +138,10 @@
       });
     });
 
     describe("Matching Strategy Schema", () => {
-      test("should validate valid matching strategies", () => {
-        const validStrategies = ["exact", "partial", "regex"];
+      test("should validate valid matching strategies", () => {});
 
-        validStrategies.forEach((strategy) => {
-          expectValidParse(zodMatchingStrategySchema, strategy);
-        });
-      });
-
       test("should reject invalid matching strategies", () => {
         const invalidStrategies = ["invalid", "", null, undefined];
 
         invalidStrategies.forEach((strategy) => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
