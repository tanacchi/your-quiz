# Mutant 1c1afc7a Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 4045
**Stable ID**: 1c1afc7a
**Location**: L21:51–L31:4

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4045
@@ -17,19 +17,9 @@
 } from "./quiz-summary-patches";
 import type { QuizSummaryInput } from "./quiz-summary-schema";
 
 describe("QuizSummary Patches", () => {
-  const validQuizSummaryInput: QuizSummaryInput = {
-    id: "quiz-123",
-    question: "What is TypeScript?",
-    answerType: "single_choice",
-    solutionId: "solution-456",
-    explanation: "TypeScript is a superset of JavaScript",
-    tagIds: ["tag-1", "tag-2"],
-    status: "pending_approval",
-    creatorId: "creator-789",
-    createdAt: "2023-12-01T10:00:00.000Z",
-  };
+  const validQuizSummaryInput: QuizSummaryInput = {};
 
   describe("Individual Patch Suggesters", () => {
     describe("suggestQuestionPatches", () => {
       it.each([
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
