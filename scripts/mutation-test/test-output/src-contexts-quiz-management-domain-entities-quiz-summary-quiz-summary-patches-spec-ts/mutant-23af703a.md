# Mutant 23af703a Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4648
**Stable ID**: 23af703a
**Location**: L546:23–L546:39

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4648
@@ -542,9 +542,9 @@
           const input = {
             status: "approved" as const,
             approvedAt: undefined,
             id: "quiz-123",
-            question: "Valid question",
+            question: "",
             answerType: "single_choice" as const,
             solutionId: "solution-456",
             creatorId: "creator-789",
             createdAt: "2023-12-01T10:00:00.000Z",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
