# Mutant e15b7c1c Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4608
**Stable ID**: e15b7c1c
**Location**: L485:21–L485:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4608
@@ -481,9 +481,9 @@
               message: "Invalid question",
             },
             {
               path: ["answerType"],
-              code: "invalid",
+              code: "",
               message: "Invalid answerType",
             },
             { path: ["status"], code: "invalid", message: "Invalid status" },
             { path: ["tagIds"], code: "invalid", message: "Invalid tagIds" },
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
