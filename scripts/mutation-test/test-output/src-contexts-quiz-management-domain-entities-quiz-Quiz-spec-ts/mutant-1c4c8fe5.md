# Mutant 1c4c8fe5 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1472
**Stable ID**: 1c4c8fe5
**Location**: L755:29–L755:38

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1472
@@ -751,9 +751,9 @@
           draft.with({
             id: "quiz-object-patch",
             question: "Object patch test?",
             answerType: "boolean",
-            solution: { id: "sol-obj", value: true },
+            solution: { id: "", value: true },
             status: "pending_approval",
             creatorId: "creator-obj",
             createdAt: "2023-12-01 10:00:00",
           });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
