# Mutant 21d7796e Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1330
**Stable ID**: 21d7796e
**Location**: L552:24–L552:42

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1330
@@ -548,9 +548,9 @@
             question: "Valid question to preserve?",
             answerType: "boolean" as const,
             solution: { id: "sol-preserve", value: true },
             status: "pending_approval" as const,
-            creatorId: "creator-preserve",
+            creatorId: "",
             createdAt: "2023-12-01 10:00:00",
           };
 
           draft.with({
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
