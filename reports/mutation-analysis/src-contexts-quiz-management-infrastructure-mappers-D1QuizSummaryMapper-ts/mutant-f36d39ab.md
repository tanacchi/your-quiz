# Mutant f36d39ab Report

**File**: src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts
**Mutator**: ConditionalExpression
**Original ID**: 29
**Stable ID**: f36d39ab
**Location**: L39:38–L39:60

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts	mutated #29
@@ -35,9 +35,9 @@
     const createData = {
       id: String(row.id),
       question: row.question,
       answerType: row.answer_type,
-      solutionId: row.solution_id && row.solution_id !== "" ? String(row.solution_id) : "placeholder",
+      solutionId: row.solution_id && true ? String(row.solution_id) : "placeholder",
       explanation: row.explanation && row.explanation !== null ? row.explanation : undefined,
       status: row.status,
       creatorId: String(row.creator_id),
       createdAt: row.created_at,
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。