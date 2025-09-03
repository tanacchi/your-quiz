# Mutant 41d0691b Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4484
**Stable ID**: 41d0691b
**Location**: L393:24–L393:41

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4484
@@ -389,9 +389,9 @@
       it("should suggest patches for all relevant fields when issues exist", () => {
         const input = {
           id: "  quiz-123  ",
           question: "",
-          explanation: "  explanation  ",
+          explanation: "",
           solutionId: "  solution-456  ",
           creatorId: "  creator-789  ",
           answerType: "bool",
           status: "pending",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
