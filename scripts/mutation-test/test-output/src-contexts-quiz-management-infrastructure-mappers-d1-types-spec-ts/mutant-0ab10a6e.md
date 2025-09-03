# Mutant 0ab10a6e Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7655
**Stable ID**: 0ab10a6e
**Location**: L330:12–L330:55

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7655
@@ -326,9 +326,9 @@
       });
     });
 
     describe("isCountResult", () => {
-      test("should return true for valid count result", () => {
+      test("", () => {
         expect(isCountResult(createValidCountResult())).toBe(true);
       });
 
       test("should return false for invalid data", () => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
