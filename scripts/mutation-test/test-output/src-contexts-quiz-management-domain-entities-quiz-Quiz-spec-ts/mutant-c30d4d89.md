# Mutant c30d4d89 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 1421
**Stable ID**: c30d4d89
**Location**: L675:17–L675:52

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1421
@@ -671,9 +671,9 @@
             // After applying the question patch, question should be fixed
             const updatedQuestion = draft.get("question");
             expect(updatedQuestion).not.toBe("   ");
             expect(typeof updatedQuestion).toBe("string");
-            if (typeof updatedQuestion === "string") {
+            if (false) {
               expect(updatedQuestion.trim().length).toBeGreaterThan(0);
             }
           }
         });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
