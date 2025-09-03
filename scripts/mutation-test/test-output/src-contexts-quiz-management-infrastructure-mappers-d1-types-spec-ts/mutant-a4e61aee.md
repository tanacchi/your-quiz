# Mutant a4e61aee Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7658
**Stable ID**: a4e61aee
**Location**: L334:12–L334:50

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7658
@@ -330,9 +330,9 @@
       test("should return true for valid count result", () => {
         expect(isCountResult(createValidCountResult())).toBe(true);
       });
 
-      test("should return false for invalid data", () => {
+      test("", () => {
         expect(isCountResult({ invalid: "data" })).toBe(false);
       });
     });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
