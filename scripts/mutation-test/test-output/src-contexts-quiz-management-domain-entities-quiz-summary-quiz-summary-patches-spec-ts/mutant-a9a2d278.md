# Mutant a9a2d278 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4043
**Stable ID**: a9a2d278
**Location**: L20:10–L20:31

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4043
@@ -16,9 +16,9 @@
   suggestTagIdsPatches,
 } from "./quiz-summary-patches";
 import type { QuizSummaryInput } from "./quiz-summary-schema";
 
-describe("QuizSummary Patches", () => {
+describe("", () => {
   const validQuizSummaryInput: QuizSummaryInput = {
     id: "quiz-123",
     question: "What is TypeScript?",
     answerType: "single_choice",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
