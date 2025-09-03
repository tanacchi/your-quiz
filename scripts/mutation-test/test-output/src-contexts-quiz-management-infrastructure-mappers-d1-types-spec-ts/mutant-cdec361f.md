# Mutant cdec361f Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7668
**Stable ID**: cdec361f
**Location**: L344:12–L344:50

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7668
@@ -340,9 +340,9 @@
       test("should return true for valid basic quiz info", () => {
         expect(isBasicQuizInfo(createValidBasicQuizInfo())).toBe(true);
       });
 
-      test("should return false for invalid data", () => {
+      test("", () => {
         expect(isBasicQuizInfo({ invalid: "data" })).toBe(false);
       });
     });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
