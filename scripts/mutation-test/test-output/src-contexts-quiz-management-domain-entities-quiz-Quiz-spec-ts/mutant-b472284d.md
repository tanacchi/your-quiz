# Mutant b472284d Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1468
**Stable ID**: b472284d
**Location**: L752:17–L752:36

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1468
@@ -748,9 +748,9 @@
 
         it("should work with object patches", () => {
           const draft = new Quiz.Draft();
           draft.with({
-            id: "quiz-object-patch",
+            id: "",
             question: "Object patch test?",
             answerType: "boolean",
             solution: { id: "sol-obj", value: true },
             status: "pending_approval",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
