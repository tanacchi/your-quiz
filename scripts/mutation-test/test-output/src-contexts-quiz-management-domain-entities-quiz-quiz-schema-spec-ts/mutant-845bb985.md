# Mutant 845bb985 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 2776
**Stable ID**: 845bb985
**Location**: L15:12–L15:16

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2776
@@ -11,9 +11,9 @@
 
 describe("Quiz Schema", () => {
   const validBooleanSolution = {
     id: "solution-123",
-    value: true,
+    value: false,
   };
 
   const validQuizData: QuizInput = {
     id: "quiz-123",
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
