# Mutant a9871f72 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2331
**Stable ID**: a9871f72
**Location**: L611:24–L611:44

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2331
@@ -607,9 +607,9 @@
             },
             {
               path: ["answerType"],
               code: "invalid",
-              message: "Invalid answerType",
+              message: "",
             },
             { path: ["status"], code: "invalid", message: "Invalid status" },
             {
               path: ["solution"],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
