# Mutant 4d2a2933 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7748
**Stable ID**: 4d2a2933
**Location**: L435:58–L441:8

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7748
@@ -431,15 +431,9 @@
 
         expect(conversionResult.isOk()).toBe(true);
       });
 
-      test("should throw error for invalid input", () => {
-        const conversionResult = Result.fromThrowable(() =>
-          toQuizRow({ invalid: "data" }),
-        )();
-
-        expect(conversionResult.isErr()).toBe(true);
-      });
+      test("should throw error for invalid input", () => {});
     });
 
     describe("toBasicQuizInfo", () => {
       test("should convert valid input correctly", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
