# Mutant befe8414 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7604
**Stable ID**: befe8414
**Location**: L252:14–L252:38

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7604
@@ -248,9 +248,9 @@
         });
       });
     });
 
-    describe("Basic Quiz Info Schema", () => {
+    describe("", () => {
       test("should validate valid basic quiz info", () => {
         expectValidParse(zodBasicQuizInfoSchema, createValidBasicQuizInfo());
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
