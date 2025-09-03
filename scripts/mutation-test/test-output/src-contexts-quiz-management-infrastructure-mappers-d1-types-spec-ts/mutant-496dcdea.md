# Mutant 496dcdea Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7723
**Stable ID**: 496dcdea
**Location**: L397:14–L397:25

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7723
@@ -393,9 +393,9 @@
     });
   });
 
   describe("Conversion Functions", () => {
-    describe("toQuizRow", () => {
+    describe("", () => {
       test("should convert valid input correctly", () => {
         const input = {
           id: 123,
           question: "Test question",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
