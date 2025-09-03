# Mutant 44b60d35 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7659
**Stable ID**: 44b60d35
**Location**: L334:58–L336:8

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7659
@@ -330,11 +330,9 @@
       test("should return true for valid count result", () => {
         expect(isCountResult(createValidCountResult())).toBe(true);
       });
 
-      test("should return false for invalid data", () => {
-        expect(isCountResult({ invalid: "data" })).toBe(false);
-      });
+      test("should return false for invalid data", () => {});
     });
 
     describe("isBasicQuizInfo", () => {
       test("should return true for valid basic quiz info", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
