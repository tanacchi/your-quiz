# Mutant d9e4b0d3 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts
**Mutator**: ArrowFunction
**Original ID**: 44
**Stable ID**: d9e4b0d3
**Location**: L52:7–L56:10

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts	mutated #44
@@ -48,13 +48,9 @@
     // QuizSummaryエンティティを作成
     const quizSummaryResult = QuizSummary.from(createData);
 
     return quizSummaryResult.mapErr(
-      (error) =>
-        new InternalServerError(
-          "Internal server error",
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