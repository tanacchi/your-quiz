# Mutant ff74ae01 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4650
**Stable ID**: ff74ae01
**Location**: L549:24–L549:37

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4650
@@ -545,9 +545,9 @@
             id: "quiz-123",
             question: "Valid question",
             answerType: "single_choice" as const,
             solutionId: "solution-456",
-            creatorId: "creator-789",
+            creatorId: "",
             createdAt: "2023-12-01T10:00:00.000Z",
           };
 
           const issues: Issue[] = [
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
