# Mutant 49f5d964 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3887
**Stable ID**: 49f5d964
**Location**: L622:48–L628:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3887
@@ -618,16 +618,10 @@
       });
     });
 
     describe("Error management", () => {
-      it("should clear errors manually", () => {
-        draft.update("question", ""); // creates error
-        expect(draft.hasErrors()).toBe(true);
+      it("should clear errors manually", () => {});
 
-        draft.clearErrors();
-        expect(draft.hasErrors()).toBe(false);
-      });
-
       it.each([
         ["existing field", "question", ""],
         ["non-existent field", "nonexistent", ""],
       ])("should get errors for %s", (_desc, field, invalidValue) => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
