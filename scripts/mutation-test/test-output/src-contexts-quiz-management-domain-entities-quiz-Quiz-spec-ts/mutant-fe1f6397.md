# Mutant fe1f6397 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 1329
**Stable ID**: fe1f6397
**Location**: L550:52–L550:56

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1329
@@ -546,9 +546,9 @@
           const validData = {
             id: "quiz-preserve",
             question: "Valid question to preserve?",
             answerType: "boolean" as const,
-            solution: { id: "sol-preserve", value: true },
+            solution: { id: "sol-preserve", value: false },
             status: "pending_approval" as const,
             creatorId: "creator-preserve",
             createdAt: "2023-12-01 10:00:00",
           };
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
