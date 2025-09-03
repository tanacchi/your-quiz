# Mutant b7589cf2 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7663
**Stable ID**: b7589cf2
**Location**: L339:14–L339:31

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7663
@@ -335,9 +335,9 @@
         expect(isCountResult({ invalid: "data" })).toBe(false);
       });
     });
 
-    describe("isBasicQuizInfo", () => {
+    describe("", () => {
       test("should return true for valid basic quiz info", () => {
         expect(isBasicQuizInfo(createValidBasicQuizInfo())).toBe(true);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
