# Mutant 623c3cbb Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4528
**Stable ID**: 623c3cbb
**Location**: L425:57–L425:73

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4528
@@ -421,9 +421,9 @@
             path: ["answerType"],
             code: "invalid",
             message: "Invalid answerType",
           },
-          { path: ["status"], code: "invalid", message: "Invalid status" },
+          { path: ["status"], code: "invalid", message: "" },
           { path: ["tagIds"], code: "invalid", message: "Invalid tagIds" },
           {
             path: ["approvedAt"],
             code: "invalid",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
