# Mutant b86bc2ba Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7665
**Stable ID**: b86bc2ba
**Location**: L340:12–L340:58

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7665
@@ -336,9 +336,9 @@
       });
     });
 
     describe("isBasicQuizInfo", () => {
-      test("should return true for valid basic quiz info", () => {
+      test("", () => {
         expect(isBasicQuizInfo(createValidBasicQuizInfo())).toBe(true);
       });
 
       test("should return false for invalid data", () => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
