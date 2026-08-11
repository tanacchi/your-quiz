# Mutant 8aa93478 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts
**Mutator**: LogicalOperator
**Original ID**: 40
**Stable ID**: 8aa93478
**Location**: L44:19–L44:62

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts	mutated #40
@@ -40,9 +40,9 @@
       explanation: row.explanation && row.explanation !== null ? row.explanation : undefined,
       status: row.status,
       creatorId: String(row.creator_id),
       createdAt: row.created_at,
-      approvedAt: row.approved_at && row.approved_at !== null ? row.approved_at : undefined,
+      approvedAt: row.approved_at || row.approved_at !== null ? row.approved_at : undefined,
       tagIds: [],
     };
 
     // QuizSummaryエンティティを作成
```

## Hint

論理演算子が置換されています（&&/|| ⇄ ||/&&）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。