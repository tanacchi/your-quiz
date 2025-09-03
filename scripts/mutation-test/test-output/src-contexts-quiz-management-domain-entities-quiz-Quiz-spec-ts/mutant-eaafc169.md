# Mutant eaafc169 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1243
**Stable ID**: eaafc169
**Location**: L430:17–L430:31

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1243
@@ -426,9 +426,9 @@
 
         it("should handle missing required fields", () => {
           const draft = new Quiz.Draft();
           draft.with({
-            id: "quiz-missing",
+            id: "",
             question: "Valid question?",
             answerType: "boolean",
             // Missing solution
             status: "pending_approval",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
