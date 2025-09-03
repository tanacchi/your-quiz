# Mutant bfcc3db7 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7543
**Stable ID**: bfcc3db7
**Location**: L150:63–L156:8

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7543
@@ -146,15 +146,9 @@
           expectValidParse(zodMatchingStrategySchema, strategy);
         });
       });
 
-      test("should reject invalid matching strategies", () => {
-        const invalidStrategies = ["invalid", "", null, undefined];
-
-        invalidStrategies.forEach((strategy) => {
-          expectInvalidParse(zodMatchingStrategySchema, strategy);
-        });
-      });
+      test("should reject invalid matching strategies", () => {});
     });
 
     describe("Quiz Row Schema", () => {
       test("should validate and transform valid quiz row", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
