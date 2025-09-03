# Mutant 91d84a79 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 3692
**Stable ID**: 91d84a79
**Location**: L409:68–L409:72

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3692
@@ -405,9 +405,9 @@
       });
 
       it("should not add duplicate tag", () => {
         const initialResult = QuizSummary.from(validQuizData);
-        const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
+        const quiz = initialResult._unsafeUnwrap({ withStackTrace: false });
         const existingTagId = validTagIds[0] as TagId;
 
         const result = quiz.addTag(existingTagId);
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
