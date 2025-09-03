# Mutant fed5bf90 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2366
**Stable ID**: fed5bf90
**Location**: L656:21–L656:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2366
@@ -652,9 +652,9 @@
               message: "Invalid answerType",
             },
             {
               path: ["solution"],
-              code: "invalid",
+              code: "",
               message: "Invalid solution",
             },
           ];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
