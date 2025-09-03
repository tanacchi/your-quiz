# Mutant 97c3b083 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 1543
**Stable ID**: 97c3b083
**Location**: L832:11–L834:42

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1543
@@ -828,11 +828,9 @@
             "answerType" in patch,
         );
         expect(answerTypePatch).toBeDefined();
         if (
-          answerTypePatch &&
-          typeof answerTypePatch === "object" &&
-          "answerType" in answerTypePatch
+          false
         ) {
           expect(answerTypePatch.answerType).toBe("boolean");
         }
       }
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
