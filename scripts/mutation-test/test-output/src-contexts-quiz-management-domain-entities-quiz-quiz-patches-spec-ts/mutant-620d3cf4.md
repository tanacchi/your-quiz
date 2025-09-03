# Mutant 620d3cf4 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2283
**Stable ID**: 620d3cf4
**Location**: L562:23–L562:38

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2283
@@ -558,9 +558,9 @@
       });
 
       it("should include consistency patches at the end", () => {
         const input = {
-          answerType: "single_choice",
+          answerType: "",
           solution: { id: "solution-123", value: true },
         };
 
         const issues: Issue[] = [
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
