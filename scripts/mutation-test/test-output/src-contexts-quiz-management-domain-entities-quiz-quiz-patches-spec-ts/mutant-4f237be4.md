# Mutant 4f237be4 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2224
**Stable ID**: 4f237be4
**Location**: L525:22–L525:42

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2224
@@ -521,9 +521,9 @@
           },
           {
             path: ["answerType"],
             code: "invalid",
-            message: "Invalid answerType",
+            message: "",
           },
           { path: ["status"], code: "invalid", message: "Invalid status" },
           { path: ["solution"], code: "invalid", message: "Invalid solution" },
         ];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
