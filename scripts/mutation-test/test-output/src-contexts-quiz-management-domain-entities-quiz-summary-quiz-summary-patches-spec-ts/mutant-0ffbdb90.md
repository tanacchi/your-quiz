# Mutant 0ffbdb90 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4628
**Stable ID**: 0ffbdb90
**Location**: L515:17–L515:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4628
@@ -511,9 +511,9 @@
               " trimmed ",
               null,
               123,
             ] as unknown as string[],
-            id: "quiz-123",
+            id: "",
             question: "Valid question",
             answerType: "single_choice" as const,
             solutionId: "solution-456",
             status: "pending_approval" as const,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
