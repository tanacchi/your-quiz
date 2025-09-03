# Mutant ea3a239b Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3277
**Stable ID**: ea3a239b
**Location**: L4:10–L4:23

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3277
@@ -1,8 +1,8 @@
 import { beforeEach, describe, expect, it } from "vitest";
 import { QuizId, QuizSummary, TagId } from "./QuizSummary";
 
-describe("QuizSummary", () => {
+describe("", () => {
   const validTagIds = [TagId.parse("tag-1"), TagId.parse("tag-2")] as const;
 
   const validQuizData = {
     id: "quiz-1",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
