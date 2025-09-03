# Mutant e54e9e51 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3369
**Stable ID**: e54e9e51
**Location**: L69:8–L69:41

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3369
@@ -65,9 +65,9 @@
     });
   });
 
   describe("Schema Validation", () => {
-    it("should validate valid quiz data", () => {
+    it("", () => {
       const quiz = QuizSummary.from(validQuizData);
 
       const entity = quiz._unsafeUnwrap({ withStackTrace: true });
       expect(entity.get("question")).toBe("What is TypeScript?");
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
