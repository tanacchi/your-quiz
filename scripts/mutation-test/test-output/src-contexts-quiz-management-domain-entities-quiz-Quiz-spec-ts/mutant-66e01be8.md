# Mutant 66e01be8 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1474
**Stable ID**: 66e01be8
**Location**: L756:21–L756:39

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1474
@@ -752,9 +752,9 @@
             id: "quiz-object-patch",
             question: "Object patch test?",
             answerType: "boolean",
             solution: { id: "sol-obj", value: true },
-            status: "pending_approval",
+            status: "",
             creatorId: "creator-obj",
             createdAt: "2023-12-01 10:00:00",
           });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
