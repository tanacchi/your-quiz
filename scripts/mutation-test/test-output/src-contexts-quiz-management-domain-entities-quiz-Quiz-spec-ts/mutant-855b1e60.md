# Mutant 855b1e60 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1418
**Stable ID**: 855b1e60
**Location**: L673:46–L673:51

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1418
@@ -669,9 +669,9 @@
             draft.applyPatches([questionPatch]);
 
             // After applying the question patch, question should be fixed
             const updatedQuestion = draft.get("question");
-            expect(updatedQuestion).not.toBe("   ");
+            expect(updatedQuestion).not.toBe("");
             expect(typeof updatedQuestion).toBe("string");
             if (typeof updatedQuestion === "string") {
               expect(updatedQuestion.trim().length).toBeGreaterThan(0);
             }
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
