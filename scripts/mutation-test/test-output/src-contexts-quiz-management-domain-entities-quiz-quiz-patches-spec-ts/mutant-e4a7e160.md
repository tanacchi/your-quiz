# Mutant e4a7e160 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2234
**Stable ID**: e4a7e160
**Location**: L528:59–L528:77

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2234
@@ -524,9 +524,9 @@
             code: "invalid",
             message: "Invalid answerType",
           },
           { path: ["status"], code: "invalid", message: "Invalid status" },
-          { path: ["solution"], code: "invalid", message: "Invalid solution" },
+          { path: ["solution"], code: "invalid", message: "" },
         ];
 
         const result = suggestQuizPatches(input, issues);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
