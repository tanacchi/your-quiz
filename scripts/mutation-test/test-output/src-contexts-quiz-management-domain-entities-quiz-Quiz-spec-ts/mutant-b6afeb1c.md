# Mutant b6afeb1c Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1128
**Stable ID**: b6afeb1c
**Location**: L294:8–L294:49

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1128
@@ -290,9 +290,9 @@
       const entityResult = draft.commit();
       expect(entityResult.isErr()).toBe(true);
     });
 
-    it("should provide patches for draft errors", () => {
+    it("", () => {
       const draft = new Quiz.Draft();
       draft.update("question", "  "); // Whitespace only
       draft.update("answerType", "bool" as unknown as "boolean"); // Typo for testing
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
