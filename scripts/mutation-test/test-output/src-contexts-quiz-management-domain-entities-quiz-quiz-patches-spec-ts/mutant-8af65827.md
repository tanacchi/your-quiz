# Mutant 8af65827 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2528
**Stable ID**: 8af65827
**Location**: L836:20–L836:40

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2528
@@ -832,9 +832,9 @@
         },
         {
           path: ["answerType"],
           code: "invalid",
-          message: "Invalid answerType",
+          message: "",
         },
         { path: ["solution"], code: "invalid", message: "Invalid solution" },
         { path: ["status"], code: "invalid", message: "Invalid status" },
         { path: ["creatorId"], code: "invalid", message: "Invalid creatorId" },
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
