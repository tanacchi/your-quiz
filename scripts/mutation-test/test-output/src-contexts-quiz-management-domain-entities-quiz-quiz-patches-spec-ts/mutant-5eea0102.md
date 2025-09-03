# Mutant 5eea0102 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2223
**Stable ID**: 5eea0102
**Location**: L524:19–L524:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2223
@@ -520,9 +520,9 @@
             message: "Invalid creatorId",
           },
           {
             path: ["answerType"],
-            code: "invalid",
+            code: "",
             message: "Invalid answerType",
           },
           { path: ["status"], code: "invalid", message: "Invalid status" },
           { path: ["solution"], code: "invalid", message: "Invalid solution" },
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
