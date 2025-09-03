# Mutant e938b2ea Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1094
**Stable ID**: e938b2ea
**Location**: L252:12–L252:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1094
@@ -248,9 +248,9 @@
       });
     });
   });
 
-  describe("Draft Usage", () => {
+  describe("", () => {
     it("should work with Draft pattern", () => {
       const draft = new Quiz.Draft();
       draft.update("question", "Draft question: Is this true?");
       draft.with({
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
