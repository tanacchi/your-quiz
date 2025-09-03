# Mutant 7e5dfc56 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7548
**Stable ID**: 7e5dfc56
**Location**: L159:14–L159:31

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7548
@@ -155,9 +155,9 @@
         });
       });
     });
 
-    describe("Quiz Row Schema", () => {
+    describe("", () => {
       test("should validate and transform valid quiz row", () => {
         const validRow = createValidQuizRow();
         expectValidParse(zodQuizRowSchema, validRow);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
