# Mutant 28bd57d7 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7534
**Stable ID**: 28bd57d7
**Location**: L141:48–L157:6

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7534
@@ -137,26 +137,10 @@
         });
       });
     });
 
-    describe("Matching Strategy Schema", () => {
-      test("should validate valid matching strategies", () => {
-        const validStrategies = ["exact", "partial", "regex"];
+    describe("Matching Strategy Schema", () => {});
 
-        validStrategies.forEach((strategy) => {
-          expectValidParse(zodMatchingStrategySchema, strategy);
-        });
-      });
-
-      test("should reject invalid matching strategies", () => {
-        const invalidStrategies = ["invalid", "", null, undefined];
-
-        invalidStrategies.forEach((strategy) => {
-          expectInvalidParse(zodMatchingStrategySchema, strategy);
-        });
-      });
-    });
-
     describe("Quiz Row Schema", () => {
       test("should validate and transform valid quiz row", () => {
         const validRow = createValidQuizRow();
         expectValidParse(zodQuizRowSchema, validRow);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
