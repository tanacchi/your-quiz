# Mutant 6d0242d5 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1096
**Stable ID**: 6d0242d5
**Location**: L253:8–L253:40

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1096
@@ -249,9 +249,9 @@
     });
   });
 
   describe("Draft Usage", () => {
-    it("should work with Draft pattern", () => {
+    it("", () => {
       const draft = new Quiz.Draft();
       draft.update("question", "Draft question: Is this true?");
       draft.with({
         answerType: "boolean",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
