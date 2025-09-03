# Mutant a26163df Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4661
**Stable ID**: a26163df
**Location**: L557:21–L557:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4661
@@ -553,9 +553,9 @@
           const issues: Issue[] = [
             { path: ["status"], code: "invalid", message: "Invalid status" },
             {
               path: ["approvedAt"],
-              code: "invalid",
+              code: "",
               message: "Invalid approvedAt",
             },
           ];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
