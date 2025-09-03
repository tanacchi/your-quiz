# Mutant 097fa186 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7693
**Stable ID**: 097fa186
**Location**: L372:12–L372:51

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7693
@@ -368,9 +368,9 @@
       test("should return true for empty array", () => {
         expect(isParsedChoiceArray([])).toBe(true);
       });
 
-      test("should return false for invalid array", () => {
+      test("", () => {
         expect(isParsedChoiceArray([{ invalid: "data" }])).toBe(false);
         expect(isParsedChoiceArray("not-an-array")).toBe(false);
       });
     });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
