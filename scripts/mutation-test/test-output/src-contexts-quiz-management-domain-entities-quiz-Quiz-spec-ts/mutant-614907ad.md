# Mutant 614907ad Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 986
**Stable ID**: 614907ad
**Location**: L103:8–L103:68

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #986
@@ -99,9 +99,9 @@
       const result = Quiz.from(inconsistentData);
       expect(result.isOk()).toBe(true);
     });
 
-    it("should validate solution requirement for boolean questions", () => {
+    it("", () => {
       const noSolutionData = {
         ...validQuizData,
         solution: null,
       };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
