# Mutant f97345d9 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7550
**Stable ID**: f97345d9
**Location**: L160:12–L160:58

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7550
@@ -156,9 +156,9 @@
       });
     });
 
     describe("Quiz Row Schema", () => {
-      test("should validate and transform valid quiz row", () => {
+      test("", () => {
         const validRow = createValidQuizRow();
         expectValidParse(zodQuizRowSchema, validRow);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
