# Mutant 0b66a262 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2394
**Stable ID**: 0b66a262
**Location**: L691:24–L691:42

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2394
@@ -687,9 +687,9 @@
           const issues: Issue[] = [
             {
               path: ["question"],
               code: "invalid",
-              message: "Invalid question",
+              message: "",
             },
             {
               path: ["explanation"],
               code: "invalid",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
