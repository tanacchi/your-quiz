# Mutant 17b9d3fe Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 984
**Stable ID**: 17b9d3fe
**Location**: L95:18–L95:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #984
@@ -91,9 +91,9 @@
         ...validQuizData,
         answerType: "boolean" as const,
         solution: {
           id: "solution-1",
-          value: true,
+          value: false,
         },
       };
 
       const result = Quiz.from(inconsistentData);
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
