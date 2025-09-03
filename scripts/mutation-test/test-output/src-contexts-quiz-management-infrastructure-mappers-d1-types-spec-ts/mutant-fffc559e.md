# Mutant fffc559e Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7725
**Stable ID**: fffc559e
**Location**: L398:12–L398:50

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7725
@@ -394,9 +394,9 @@
   });
 
   describe("Conversion Functions", () => {
     describe("toQuizRow", () => {
-      test("should convert valid input correctly", () => {
+      test("", () => {
         const input = {
           id: 123,
           question: "Test question",
           answer_type: "boolean",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
