# Mutant f01e4492 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2148
**Stable ID**: f01e4492
**Location**: L463:19–L463:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2148
@@ -459,9 +459,9 @@
         const input = {
           id: "  quiz-123  ",
           question: "  Valid question?  ",
           answerType: "bool",
-          status: "pending",
+          status: "",
           solution: null,
         };
 
         const issues: Issue[] = [
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
