# Mutant 42064af2 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7666
**Stable ID**: 42064af2
**Location**: L340:66–L342:8

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7666
@@ -336,11 +336,9 @@
       });
     });
 
     describe("isBasicQuizInfo", () => {
-      test("should return true for valid basic quiz info", () => {
-        expect(isBasicQuizInfo(createValidBasicQuizInfo())).toBe(true);
-      });
+      test("should return true for valid basic quiz info", () => {});
 
       test("should return false for invalid data", () => {
         expect(isBasicQuizInfo({ invalid: "data" })).toBe(false);
       });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
