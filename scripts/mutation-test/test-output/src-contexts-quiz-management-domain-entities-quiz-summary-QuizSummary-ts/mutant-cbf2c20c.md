# Mutant cbf2c20c Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts
**Mutator**: StringLiteral
**Original ID**: 4006
**Stable ID**: cbf2c20c
**Location**: L221:15–L221:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts	mutated #4006
@@ -217,9 +217,9 @@
     const currentTagIds = this.get("tagIds");
     const newTagIds = currentTagIds.filter((id) => id !== tagId);
     if (newTagIds.length === currentTagIds.length) {
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
