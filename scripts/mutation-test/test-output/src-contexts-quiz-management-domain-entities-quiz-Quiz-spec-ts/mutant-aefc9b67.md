# Mutant aefc9b67 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1446
**Stable ID**: aefc9b67
**Location**: L713:21–L713:39

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1446
@@ -709,9 +709,9 @@
             id: "quiz-empty-patches",
             question: "Valid question?",
             answerType: "boolean",
             solution: { id: "sol-empty", value: true },
-            status: "pending_approval",
+            status: "",
             creatorId: "creator-empty",
             createdAt: "2023-12-01 10:00:00",
           });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
