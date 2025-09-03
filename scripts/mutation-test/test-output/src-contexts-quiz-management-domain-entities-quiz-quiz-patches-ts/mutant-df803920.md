# Mutant df803920 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts
**Mutator**: MethodExpression
**Original ID**: 2639
**Stable ID**: df803920
**Location**: L75:22–L75:48

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts	mutated #2639
@@ -71,9 +71,9 @@
 export const suggestAnswerTypePatches: QuizFieldSuggester = (value) => {
   if (typeof value !== "string") return [];
 
   const patches: QuizPatch[] = [];
-  const answerType = value.toLowerCase().trim();
+  const answerType = value.toLowerCase();
 
   // booleanに関連する様々な表記を修正
   const booleanPatterns = [
     "bool",
```

## Hint

ミューテータ "MethodExpression" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
