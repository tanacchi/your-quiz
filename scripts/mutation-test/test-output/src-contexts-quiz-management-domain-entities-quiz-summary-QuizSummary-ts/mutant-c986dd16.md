# Mutant c986dd16 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts
**Mutator**: StringLiteral
**Original ID**: 4025
**Stable ID**: c986dd16
**Location**: L247:15–L247:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts	mutated #4025
@@ -243,9 +243,9 @@
     const currentTagIds = this.get("tagIds");
     const duplicates = tagIds.filter((id) => currentTagIds.includes(id));
     if (duplicates.length > 0) {
       const error: QuizSummaryParseError = {
-        kind: "parse",
+        kind: "",
         issues: [
           {
             path: ["tagIds"],
             code: "custom",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
