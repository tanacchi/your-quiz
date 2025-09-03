# Mutant b21fd01e Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3605
**Stable ID**: b21fd01e
**Location**: L326:14–L326:42

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3605
@@ -322,9 +322,9 @@
         expect(quiz.canBeUpdated()).toBe(expectedCanUpdate);
       });
     });
 
-    describe("canBeDeleted status checks", () => {
+    describe("", () => {
       it.each([
         ["pending_approval", true],
         ["approved", false],
         ["rejected", true],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
