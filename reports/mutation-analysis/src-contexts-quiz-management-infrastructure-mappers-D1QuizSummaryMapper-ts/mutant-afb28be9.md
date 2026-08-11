# Mutant afb28be9 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts
**Mutator**: LogicalOperator
**Original ID**: 28
**Stable ID**: afb28be9
**Location**: L39:19–L39:60

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts	mutated #28
@@ -35,9 +35,9 @@
     const createData = {
       id: String(row.id),
       question: row.question,
       answerType: row.answer_type,
-      solutionId: row.solution_id && row.solution_id !== "" ? String(row.solution_id) : "placeholder",
+      solutionId: row.solution_id || row.solution_id !== "" ? String(row.solution_id) : "placeholder",
       explanation: row.explanation && row.explanation !== null ? row.explanation : undefined,
       status: row.status,
       creatorId: String(row.creator_id),
       createdAt: row.created_at,
```

## Hint

論理演算子が置換されています（&&/|| ⇄ ||/&&）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。