# Mutant 5230ba44 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4603
**Stable ID**: 5230ba44
**Location**: L480:21–L480:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4603
@@ -476,9 +476,9 @@
           const issues: Issue[] = [
             { path: ["id"], code: "invalid", message: "Invalid id" },
             {
               path: ["question"],
-              code: "invalid",
+              code: "",
               message: "Invalid question",
             },
             {
               path: ["answerType"],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
