# Mutant 987e1d22 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1328
**Stable ID**: 987e1d22
**Location**: L550:29–L550:43

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1328
@@ -546,9 +546,9 @@
           const validData = {
             id: "quiz-preserve",
             question: "Valid question to preserve?",
             answerType: "boolean" as const,
-            solution: { id: "sol-preserve", value: true },
+            solution: { id: "", value: true },
             status: "pending_approval" as const,
             creatorId: "creator-preserve",
             createdAt: "2023-12-01 10:00:00",
           };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
