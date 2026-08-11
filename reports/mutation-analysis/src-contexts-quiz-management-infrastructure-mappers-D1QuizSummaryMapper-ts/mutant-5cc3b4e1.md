# Mutant 5cc3b4e1 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts
**Mutator**: EqualityOperator
**Original ID**: 30
**Stable ID**: 5cc3b4e1
**Location**: L39:38–L39:60

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts	mutated #30
@@ -35,9 +35,9 @@
     const createData = {
       id: String(row.id),
       question: row.question,
       answerType: row.answer_type,
-      solutionId: row.solution_id && row.solution_id !== "" ? String(row.solution_id) : "placeholder",
+      solutionId: row.solution_id && row.solution_id === "" ? String(row.solution_id) : "placeholder",
       explanation: row.explanation && row.explanation !== null ? row.explanation : undefined,
       status: row.status,
       creatorId: String(row.creator_id),
       createdAt: row.created_at,
```

## Hint

等価演算子が置換されています（==/=== ⇄ !=/!==）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。