# Mutant 0c339ac4 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 1420
**Stable ID**: 0c339ac4
**Location**: L675:17–L675:52

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1420
@@ -671,9 +671,9 @@
             // After applying the question patch, question should be fixed
             const updatedQuestion = draft.get("question");
             expect(updatedQuestion).not.toBe("   ");
             expect(typeof updatedQuestion).toBe("string");
-            if (typeof updatedQuestion === "string") {
+            if (true) {
               expect(updatedQuestion.trim().length).toBeGreaterThan(0);
             }
           }
         });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
