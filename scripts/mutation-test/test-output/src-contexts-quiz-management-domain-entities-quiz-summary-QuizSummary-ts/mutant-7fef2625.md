# Mutant 7fef2625 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts
**Mutator**: StringLiteral
**Original ID**: 3967
**Stable ID**: 7fef2625
**Location**: L164:15–L164:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts	mutated #3967
@@ -160,9 +160,9 @@
    */
   approve(approvedAt: string): QuizSummaryParseResult {
     if (this.get("status") !== "pending_approval") {
       const error: QuizSummaryParseError = {
-        kind: "parse",
+        kind: "",
         issues: [
           {
             path: ["status"],
             code: "custom",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
