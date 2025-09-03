# Mutant 3a3b7c33 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 1202
**Stable ID**: 3a3b7c33
**Location**: L377:52–L377:56

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1202
@@ -373,9 +373,9 @@
           draft.with({
             id: "quiz-business",
             question: "Is this quiz ready for approval?",
             answerType: "boolean",
-            solution: { id: "sol-business", value: true },
+            solution: { id: "sol-business", value: false },
             status: "pending_approval",
             creatorId: "creator-business",
             createdAt: "2023-12-01 10:00:00",
           });
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
