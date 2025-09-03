# Mutant 0f5cab37 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2362
**Stable ID**: 0f5cab37
**Location**: L652:24–L652:44

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2362
@@ -648,9 +648,9 @@
           const issues: Issue[] = [
             {
               path: ["answerType"],
               code: "invalid",
-              message: "Invalid answerType",
+              message: "",
             },
             {
               path: ["solution"],
               code: "invalid",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
