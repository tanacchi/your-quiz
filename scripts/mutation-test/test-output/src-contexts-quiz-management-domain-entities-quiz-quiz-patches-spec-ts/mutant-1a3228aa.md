# Mutant 1a3228aa Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1640
**Stable ID**: 1a3228aa
**Location**: L20:10–L20:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1640
@@ -16,9 +16,9 @@
   suggestStatusPatches,
 } from "./quiz-patches";
 import type { CreatorId, QuizData, QuizId, QuizInput } from "./quiz-schema";
 
-describe("Quiz Patches", () => {
+describe("", () => {
   const validQuizInput: QuizInput = {
     id: "quiz-123",
     question: "Is TypeScript a superset of JavaScript?",
     answerType: "boolean",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
