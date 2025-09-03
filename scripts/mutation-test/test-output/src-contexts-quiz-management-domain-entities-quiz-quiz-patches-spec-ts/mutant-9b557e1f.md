# Mutant 9b557e1f Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2330
**Stable ID**: 9b557e1f
**Location**: L610:21–L610:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2330
@@ -606,9 +606,9 @@
               message: "Invalid question",
             },
             {
               path: ["answerType"],
-              code: "invalid",
+              code: "",
               message: "Invalid answerType",
             },
             { path: ["status"], code: "invalid", message: "Invalid status" },
             {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
