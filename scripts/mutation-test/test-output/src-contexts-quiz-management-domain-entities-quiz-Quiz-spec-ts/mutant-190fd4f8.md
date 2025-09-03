# Mutant 190fd4f8 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 891
**Stable ID**: 190fd4f8
**Location**: L4:10–L4:16

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #891
@@ -1,8 +1,8 @@
 import { beforeEach, describe, expect, it } from "vitest";
 import { CreatorId, Quiz, QuizId } from "./Quiz";
 
-describe("Quiz", () => {
+describe("", () => {
   const validQuizData = {
     id: "quiz-1",
     question: "Is TypeScript a superset of JavaScript?",
     answerType: "boolean" as const,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
