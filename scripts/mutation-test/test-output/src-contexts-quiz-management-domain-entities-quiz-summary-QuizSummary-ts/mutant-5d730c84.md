# Mutant 5d730c84 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts
**Mutator**: StringLiteral
**Original ID**: 3971
**Stable ID**: 5d730c84
**Location**: L167:20–L167:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts	mutated #3971
@@ -163,9 +163,9 @@
       const error: QuizSummaryParseError = {
         kind: "parse",
         issues: [
           {
-            path: ["status"],
+            path: [""],
             code: "custom",
             message: `Quiz with status ${this.get("status")} cannot be approved`,
           },
         ],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
