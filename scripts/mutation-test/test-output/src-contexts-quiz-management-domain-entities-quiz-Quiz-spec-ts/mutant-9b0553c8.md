# Mutant 9b0553c8 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 943
**Stable ID**: 9b0553c8
**Location**: L50:8–L50:53

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #943
@@ -46,9 +46,9 @@
     });
   });
 
   describe("Entity Creation", () => {
-    it("should create valid quiz from complete data", () => {
+    it("", () => {
       const result = Quiz.from(validQuizData);
       expect(result.isOk()).toBe(true);
 
       if (result.isOk()) {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
