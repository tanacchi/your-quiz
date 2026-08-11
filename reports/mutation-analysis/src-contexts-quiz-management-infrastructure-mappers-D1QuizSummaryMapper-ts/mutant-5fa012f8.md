# Mutant 5fa012f8 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts
**Mutator**: ArrayDeclaration
**Original ID**: 8
**Stable ID**: 5fa012f8
**Location**: L32:15–L32:17

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts	mutated #8
@@ -28,9 +28,9 @@
       status: row.status,
       creatorId: String(row.creator_id),
       createdAt: row.created_at,
       approvedAt: row.approved_at || undefined,
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