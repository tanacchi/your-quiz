# Mutant 7391fb78 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1423
**Stable ID**: 7391fb78
**Location**: L675:44–L675:52

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1423
@@ -671,9 +671,9 @@
             // After applying the question patch, question should be fixed
             const updatedQuestion = draft.get("question");
             expect(updatedQuestion).not.toBe("   ");
             expect(typeof updatedQuestion).toBe("string");
-            if (typeof updatedQuestion === "string") {
+            if (typeof updatedQuestion === "") {
               expect(updatedQuestion.trim().length).toBeGreaterThan(0);
             }
           }
         });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
