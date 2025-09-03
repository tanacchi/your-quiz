# Mutant b669545f Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1304
**Stable ID**: b669545f
**Location**: L515:29–L515:45

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1304
@@ -511,9 +511,9 @@
           draft.with({
             id: "quiz-multi-patches",
             question: "  ",
             answerType: "bool" as unknown as "boolean",
-            solution: { id: "sol-multi-null", value: true },
+            solution: { id: "", value: true },
             status: "pending_approval",
             creatorId: "creator-multi",
             createdAt: "2023-12-01 10:00:00",
           });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
