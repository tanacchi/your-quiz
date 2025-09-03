# Mutant c2f01492 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3370
**Stable ID**: c2f01492
**Location**: L69:49–L76:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3370
@@ -65,17 +65,10 @@
     });
   });
 
   describe("Schema Validation", () => {
-    it("should validate valid quiz data", () => {
-      const quiz = QuizSummary.from(validQuizData);
+    it("should validate valid quiz data", () => {});
 
-      const entity = quiz._unsafeUnwrap({ withStackTrace: true });
-      expect(entity.get("question")).toBe("What is TypeScript?");
-      expect(entity.get("answerType")).toBe("single_choice");
-      expect(entity.get("status")).toBe("pending_approval");
-    });
-
     describe("Invalid field values", () => {
       it.each([
         [
           "invalid answer type",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
