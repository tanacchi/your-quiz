# Mutant 7ee5e2e2 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3846
**Stable ID**: 7ee5e2e2
**Location**: L569:45–L577:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3846
@@ -565,17 +565,9 @@
         ["empty solutionId", { solutionId: "" }, "solutionId"],
         ["invalid createdAt", { createdAt: "invalid-date" }, "createdAt"],
       ])(
         "should validate and store errors for %s",
-        (_desc, invalidData, errorField) => {
-          Object.entries(invalidData).forEach(([key, value]) => {
-            draft.update(key as keyof typeof validQuizData, value);
-          });
-
-          expect(draft.hasErrors()).toBe(true);
-          const fieldErrors = draft.getErrors(errorField);
-          expect(fieldErrors.length).toBeGreaterThan(0);
-        },
+        (_desc, invalidData, errorField) => {},
       );
 
       it("should clear errors when data becomes valid", () => {
         // First set invalid data
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
