# Mutant b2b817ad Report

**File**: src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts
**Mutator**: ConditionalExpression
**Original ID**: 36
**Stable ID**: b2b817ad
**Location**: L40:39–L40:63

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts	mutated #36
@@ -36,9 +36,9 @@
       id: String(row.id),
       question: row.question,
       answerType: row.answer_type,
       solutionId: row.solution_id && row.solution_id !== "" ? String(row.solution_id) : "placeholder",
-      explanation: row.explanation && row.explanation !== null ? row.explanation : undefined,
+      explanation: row.explanation && true ? row.explanation : undefined,
       status: row.status,
       creatorId: String(row.creator_id),
       createdAt: row.created_at,
       approvedAt: row.approved_at && row.approved_at !== null ? row.approved_at : undefined,
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。