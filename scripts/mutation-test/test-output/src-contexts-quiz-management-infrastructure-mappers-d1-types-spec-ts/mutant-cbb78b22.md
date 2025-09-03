# Mutant cbb78b22 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7753
**Stable ID**: cbb78b22
**Location**: L444:14–L444:31

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7753
@@ -440,9 +440,9 @@
         expect(conversionResult.isErr()).toBe(true);
       });
     });
 
-    describe("toBasicQuizInfo", () => {
+    describe("", () => {
       test("should convert valid input correctly", () => {
         const input = {
           id: 123,
           solution_id: 456,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
