# Mutant 66b4f2d5 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1132
**Stable ID**: 66b4f2d5
**Location**: L297:20–L297:32

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1132
@@ -293,9 +293,9 @@
 
     it("should provide patches for draft errors", () => {
       const draft = new Quiz.Draft();
       draft.update("question", "  "); // Whitespace only
-      draft.update("answerType", "bool" as unknown as "boolean"); // Typo for testing
+      draft.update("", "bool" as unknown as "boolean"); // Typo for testing
 
       expect(draft.hasErrors()).toBe(true);
 
       const patches = draft.getPatches();
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
