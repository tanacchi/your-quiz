# Mutant d7ca2523 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts
**Mutator**: StringLiteral
**Original ID**: 31
**Stable ID**: d7ca2523
**Location**: L39:58–L39:60

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts	mutated #31
@@ -35,9 +35,9 @@
     const createData = {
       id: String(row.id),
       question: row.question,
       answerType: row.answer_type,
-      solutionId: row.solution_id && row.solution_id !== "" ? String(row.solution_id) : "placeholder",
+      solutionId: row.solution_id && row.solution_id !== "Stryker was here!" ? String(row.solution_id) : "placeholder",
       explanation: row.explanation && row.explanation !== null ? row.explanation : undefined,
       status: row.status,
       creatorId: String(row.creator_id),
       createdAt: row.created_at,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。