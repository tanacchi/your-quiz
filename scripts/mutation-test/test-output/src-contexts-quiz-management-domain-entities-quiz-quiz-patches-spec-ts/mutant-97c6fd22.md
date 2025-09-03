# Mutant 97c6fd22 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1643
**Stable ID**: 97c6fd22
**Location**: L22:9–L22:19

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1643
@@ -18,9 +18,9 @@
 import type { CreatorId, QuizData, QuizId, QuizInput } from "./quiz-schema";
 
 describe("Quiz Patches", () => {
   const validQuizInput: QuizInput = {
-    id: "quiz-123",
+    id: "",
     question: "Is TypeScript a superset of JavaScript?",
     answerType: "boolean",
     solution: {
       id: "solution-456",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
