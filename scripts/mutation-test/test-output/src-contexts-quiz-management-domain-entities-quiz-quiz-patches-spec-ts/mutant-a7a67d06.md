# Mutant a7a67d06 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2361
**Stable ID**: a7a67d06
**Location**: L651:21–L651:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2361
@@ -647,9 +647,9 @@
 
           const issues: Issue[] = [
             {
               path: ["answerType"],
-              code: "invalid",
+              code: "",
               message: "Invalid answerType",
             },
             {
               path: ["solution"],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
