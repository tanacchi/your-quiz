# Mutant b23e0dd3 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 979
**Stable ID**: b23e0dd3
**Location**: L89:8–L89:48

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #979
@@ -85,9 +85,9 @@
         expect(hasQuestionPatch).toBe(true);
       }
     });
 
-    it("should enforce answer type consistency", () => {
+    it("", () => {
       const inconsistentData = {
         ...validQuizData,
         answerType: "boolean" as const,
         solution: {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
