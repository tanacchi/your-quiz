# Mutant 8d38f0f6 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts
**Mutator**: ArrowFunction
**Original ID**: 9
**Stable ID**: 8d38f0f6
**Location**: L39:7–L42:10

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts	mutated #9
@@ -35,12 +35,9 @@
     // QuizSummaryエンティティを作成
     const quizSummaryResult = QuizSummary.from(createData);
 
     return quizSummaryResult.mapErr(
-      (error) =>
-        new InternalServerError(
-          `Failed to create QuizSummary from row data: ${JSON.stringify(error)}`,
-        ),
+      () => undefined,
     );
   }
 
   /**
```

## Hint

ミューテータ "ArrowFunction" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。