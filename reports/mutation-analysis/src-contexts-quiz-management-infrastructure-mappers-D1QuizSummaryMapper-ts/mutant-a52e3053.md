# Mutant a52e3053 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts
**Mutator**: ArrayDeclaration
**Original ID**: 43
**Stable ID**: a52e3053
**Location**: L45:15–L45:17

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts	mutated #43
@@ -41,9 +41,9 @@
       status: row.status,
       creatorId: String(row.creator_id),
       createdAt: row.created_at,
       approvedAt: row.approved_at && row.approved_at !== null ? row.approved_at : undefined,
-      tagIds: [],
+      tagIds: ["Stryker was here"],
     };
 
     // QuizSummaryエンティティを作成
     const quizSummaryResult = QuizSummary.from(createData);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。