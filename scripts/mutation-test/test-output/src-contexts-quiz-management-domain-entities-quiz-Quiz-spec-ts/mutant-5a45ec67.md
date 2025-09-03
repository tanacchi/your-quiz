# Mutant 5a45ec67 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1287
**Stable ID**: 5a45ec67
**Location**: L482:29–L482:42

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1287
@@ -478,9 +478,9 @@
           draft.with({
             id: "quiz-patches",
             question: "   ", // Invalid whitespace-only question
             answerType: "bool" as unknown as "boolean", // Invalid answerType
-            solution: { id: "sol-patches", value: true },
+            solution: { id: "", value: true },
             status: "pending_approval", // Valid status
             creatorId: "creator-patches",
             createdAt: "2023-12-01 10:00:00",
           });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
