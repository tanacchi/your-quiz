# Mutant 4695a8cc Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1448
**Stable ID**: 4695a8cc
**Location**: L715:24–L715:45

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1448
@@ -711,9 +711,9 @@
             answerType: "boolean",
             solution: { id: "sol-empty", value: true },
             status: "pending_approval",
             creatorId: "creator-empty",
-            createdAt: "2023-12-01 10:00:00",
+            createdAt: "",
           });
 
           const originalState = { ...draft.state };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
