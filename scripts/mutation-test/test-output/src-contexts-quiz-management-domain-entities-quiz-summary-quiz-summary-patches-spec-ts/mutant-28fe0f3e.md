# Mutant 28fe0f3e Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4522
**Stable ID**: 28fe0f3e
**Location**: L422:19–L422:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4522
@@ -418,9 +418,9 @@
             message: "Invalid creatorId",
           },
           {
             path: ["answerType"],
-            code: "invalid",
+            code: "",
             message: "Invalid answerType",
           },
           { path: ["status"], code: "invalid", message: "Invalid status" },
           { path: ["tagIds"], code: "invalid", message: "Invalid tagIds" },
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
