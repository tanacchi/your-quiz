# Mutant 96dce0b6 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.ts
**Mutator**: StringLiteral
**Original ID**: 1607
**Stable ID**: 96dce0b6
**Location**: L137:15–L137:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.ts	mutated #1607
@@ -133,9 +133,9 @@
    */
   approve(approvedAt: string): QuizParseResult {
     if (this.get("status") !== "pending_approval") {
       const error: QuizParseError = {
-        kind: "invalid_state",
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
