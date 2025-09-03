# Mutant eac7999a Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2325
**Stable ID**: eac7999a
**Location**: L605:21–L605:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2325
@@ -601,9 +601,9 @@
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
