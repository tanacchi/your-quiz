# Mutant 957b0cd7 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts
**Mutator**: StringLiteral
**Original ID**: 3984
**Stable ID**: 957b0cd7
**Location**: L195:15–L195:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts	mutated #3984
@@ -191,9 +191,9 @@
   addTag(tagId: TagId): QuizSummaryParseResult {
     const currentTagIds = this.get("tagIds");
     if (currentTagIds.includes(tagId)) {
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
