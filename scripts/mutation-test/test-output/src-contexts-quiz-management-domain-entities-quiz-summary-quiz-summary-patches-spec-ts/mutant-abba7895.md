# Mutant abba7895 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4485
**Stable ID**: abba7895
**Location**: L394:23–L394:41

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4485
@@ -390,9 +390,9 @@
         const input = {
           id: "  quiz-123  ",
           question: "",
           explanation: "  explanation  ",
-          solutionId: "  solution-456  ",
+          solutionId: "",
           creatorId: "  creator-789  ",
           answerType: "bool",
           status: "pending",
           tagIds: ["valid", "", " trimmed "],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
