# Mutant aa780b70 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2527
**Stable ID**: aa780b70
**Location**: L835:17–L835:26

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2527
@@ -831,9 +831,9 @@
           message: "Invalid explanation",
         },
         {
           path: ["answerType"],
-          code: "invalid",
+          code: "",
           message: "Invalid answerType",
         },
         { path: ["solution"], code: "invalid", message: "Invalid solution" },
         { path: ["status"], code: "invalid", message: "Invalid status" },
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
