# Mutant ad7ef27a Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.ts
**Mutator**: StringLiteral
**Original ID**: 1626
**Stable ID**: ad7ef27a
**Location**: L165:15–L165:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.ts	mutated #1626
@@ -161,9 +161,9 @@
    */
   reject(_reason?: string): QuizParseResult {
     if (this.get("status") !== "pending_approval") {
       const error: QuizParseError = {
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
