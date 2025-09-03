# Mutant 4b7dc889 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4533
**Stable ID**: 4b7dc889
**Location**: L426:57–L426:73

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4533
@@ -422,9 +422,9 @@
             code: "invalid",
             message: "Invalid answerType",
           },
           { path: ["status"], code: "invalid", message: "Invalid status" },
-          { path: ["tagIds"], code: "invalid", message: "Invalid tagIds" },
+          { path: ["tagIds"], code: "invalid", message: "" },
           {
             path: ["approvedAt"],
             code: "invalid",
             message: "Invalid approvedAt",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
