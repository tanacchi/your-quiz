# Mutant 921ade48 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1447
**Stable ID**: 921ade48
**Location**: L714:24–L714:39

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1447
@@ -710,9 +710,9 @@
             question: "Valid question?",
             answerType: "boolean",
             solution: { id: "sol-empty", value: true },
             status: "pending_approval",
-            creatorId: "creator-empty",
+            creatorId: "",
             createdAt: "2023-12-01 10:00:00",
           });
 
           const originalState = { ...draft.state };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
