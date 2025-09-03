# Mutant c24d0367 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3850
**Stable ID**: c24d0367
**Location**: L580:63–L589:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3850
@@ -576,18 +576,9 @@
           expect(fieldErrors.length).toBeGreaterThan(0);
         },
       );
 
-      it("should clear errors when data becomes valid", () => {
-        // First set invalid data
-        draft.update("question", "");
-        expect(draft.hasErrors()).toBe(true);
-
-        // Then fix the data
-        draft.update("question", "Valid question");
-        draft.with(validQuizData as Record<string, unknown>);
-        expect(draft.hasErrors()).toBe(false);
-      });
+      it("should clear errors when data becomes valid", () => {});
     });
 
     describe("Commit operations", () => {
       it("should commit to QuizSummary when valid", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
