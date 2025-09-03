# Mutant b6f32649 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2229
**Stable ID**: b6f32649
**Location**: L527:57–L527:73

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2229
@@ -523,9 +523,9 @@
             path: ["answerType"],
             code: "invalid",
             message: "Invalid answerType",
           },
-          { path: ["status"], code: "invalid", message: "Invalid status" },
+          { path: ["status"], code: "invalid", message: "" },
           { path: ["solution"], code: "invalid", message: "Invalid solution" },
         ];
 
         const result = suggestQuizPatches(input, issues);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
