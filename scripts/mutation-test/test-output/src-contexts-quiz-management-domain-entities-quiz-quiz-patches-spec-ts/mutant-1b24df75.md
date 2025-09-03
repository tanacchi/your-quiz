# Mutant 1b24df75 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2399
**Stable ID**: 1b24df75
**Location**: L696:24–L696:45

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2399
@@ -692,9 +692,9 @@
             },
             {
               path: ["explanation"],
               code: "invalid",
-              message: "Invalid explanation",
+              message: "",
             },
           ];
 
           const patches = suggestQuizPatches(input, issues);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
