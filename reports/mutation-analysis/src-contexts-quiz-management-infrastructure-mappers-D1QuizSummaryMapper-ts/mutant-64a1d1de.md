# Mutant 64a1d1de Report

**File**: src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts
**Mutator**: LogicalOperator
**Original ID**: 35
**Stable ID**: 64a1d1de
**Location**: L40:20–L40:63

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts	mutated #35
@@ -36,9 +36,9 @@
       id: String(row.id),
       question: row.question,
       answerType: row.answer_type,
       solutionId: row.solution_id && row.solution_id !== "" ? String(row.solution_id) : "placeholder",
-      explanation: row.explanation && row.explanation !== null ? row.explanation : undefined,
+      explanation: row.explanation || row.explanation !== null ? row.explanation : undefined,
       status: row.status,
       creatorId: String(row.creator_id),
       createdAt: row.created_at,
       approvedAt: row.approved_at && row.approved_at !== null ? row.approved_at : undefined,
```

## Hint

論理演算子が置換されています（&&/|| ⇄ ||/&&）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。