# Mutant 478bd962 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4523
**Stable ID**: 478bd962
**Location**: L423:22–L423:42

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4523
@@ -419,9 +419,9 @@
           },
           {
             path: ["answerType"],
             code: "invalid",
-            message: "Invalid answerType",
+            message: "",
           },
           { path: ["status"], code: "invalid", message: "Invalid status" },
           { path: ["tagIds"], code: "invalid", message: "Invalid tagIds" },
           {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
