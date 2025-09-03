# Mutant 1e889b03 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4631
**Stable ID**: 1e889b03
**Location**: L520:24–L520:37

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4631
@@ -516,9 +516,9 @@
             question: "Valid question",
             answerType: "single_choice" as const,
             solutionId: "solution-456",
             status: "pending_approval" as const,
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
