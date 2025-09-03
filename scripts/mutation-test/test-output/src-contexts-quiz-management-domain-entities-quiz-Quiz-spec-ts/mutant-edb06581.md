# Mutant edb06581 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: EqualityOperator
**Original ID**: 1422
**Stable ID**: edb06581
**Location**: L675:17–L675:52

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1422
@@ -671,9 +671,9 @@
             // After applying the question patch, question should be fixed
             const updatedQuestion = draft.get("question");
             expect(updatedQuestion).not.toBe("   ");
             expect(typeof updatedQuestion).toBe("string");
-            if (typeof updatedQuestion === "string") {
+            if (typeof updatedQuestion !== "string") {
               expect(updatedQuestion.trim().length).toBeGreaterThan(0);
             }
           }
         });
```

## Hint

等価演算子が置換されています（==/=== ⇄ !=/!==）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
