# Mutant 1cb5c179 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts
**Mutator**: MethodExpression
**Original ID**: 2668
**Stable ID**: 1cb5c179
**Location**: L106:18–L106:44

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.ts	mutated #2668
@@ -102,9 +102,9 @@
 export const suggestStatusPatches: QuizFieldSuggester = (value) => {
   if (typeof value !== "string") return [];
 
   const patches: QuizPatch[] = [];
-  const status = value.toLowerCase().trim();
+  const status = value.toLowerCase();
   const statusSuggestions = {
     pending: "pending_approval",
     waiting: "pending_approval",
     draft: "pending_approval",
```

## Hint

ミューテータ "MethodExpression" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
