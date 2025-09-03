# Mutant bbc8f86a Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3919
**Stable ID**: bbc8f86a
**Location**: L650:56–L663:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3919
@@ -646,22 +646,9 @@
     });
   });
 
   describe("Type Safety", () => {
-    it("should enforce return type constraints", () => {
-      const result = QuizSummary.from(validQuizData);
-      const quiz = result._unsafeUnwrap({ withStackTrace: true });
-
-      // These should compile with correct types
-      const question: string = quiz.get("question");
-      const status: "pending_approval" | "approved" | "rejected" =
-        quiz.get("status");
-      const tagIds: TagId[] = quiz.get("tagIds");
-
-      expect(typeof question).toBe("string");
-      expect(typeof status).toBe("string");
-      expect(Array.isArray(tagIds)).toBe(true);
-    });
+    it("should enforce return type constraints", () => {});
   });
 
   describe("Data Transfer", () => {
     it("should convert to Data", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
