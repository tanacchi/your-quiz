# Mutant 1002a33f Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1491
**Stable ID**: 1002a33f
**Location**: L778:21–L778:39

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1491
@@ -774,9 +774,9 @@
             id: "quiz-patch-error",
             question: "Patch error test?",
             answerType: "boolean",
             solution: { id: "sol-error", value: true },
-            status: "pending_approval",
+            status: "",
             creatorId: "creator-error",
             createdAt: "2023-12-01 10:00:00",
           });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
