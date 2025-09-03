# Mutant 25e7cea0 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4046
**Stable ID**: 25e7cea0
**Location**: L22:9–L22:19

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4046
@@ -18,9 +18,9 @@
 import type { QuizSummaryInput } from "./quiz-summary-schema";
 
 describe("QuizSummary Patches", () => {
   const validQuizSummaryInput: QuizSummaryInput = {
-    id: "quiz-123",
+    id: "",
     question: "What is TypeScript?",
     answerType: "single_choice",
     solutionId: "solution-456",
     explanation: "TypeScript is a superset of JavaScript",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
