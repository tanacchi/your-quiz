# Mutant 6d595c9d Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1194
**Stable ID**: 6d595c9d
**Location**: L371:12–L371:68

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1194
@@ -367,9 +367,9 @@
             expect(quiz.getSolution().get("value")).toBe(false);
           }
         });
 
-        it("should create quiz with business logic methods working", () => {
+        it("", () => {
           const draft = new Quiz.Draft();
           draft.with({
             id: "quiz-business",
             question: "Is this quiz ready for approval?",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
