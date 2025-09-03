# Mutant d55a06ef Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1367
**Stable ID**: d55a06ef
**Location**: L612:29–L612:45

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1367
@@ -608,9 +608,9 @@
           draft.with({
             id: "quiz-equivalent",
             question: "Are fromDraft and commit equivalent?",
             answerType: "boolean",
-            solution: { id: "sol-equivalent", value: true },
+            solution: { id: "", value: true },
             status: "pending_approval",
             creatorId: "creator-equivalent",
             createdAt: "2023-12-01 10:00:00",
           });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
