# Mutant 411cd038 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7638
**Stable ID**: 411cd038
**Location**: L307:12–L307:25

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7638
@@ -303,9 +303,9 @@
       });
     });
   });
 
-  describe("Type Guards", () => {
+  describe("", () => {
     describe("isQuizRow", () => {
       test("should return true for valid quiz row", () => {
         expect(isQuizRow(createValidQuizRow())).toBe(true);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
