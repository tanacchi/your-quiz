# Mutant 0c9ff8d7 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4592
**Stable ID**: 0c9ff8d7
**Location**: L472:24–L472:37

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4592
@@ -468,9 +468,9 @@
             answerType: "bool" as unknown as "boolean",
             status: "pending" as unknown as "pending_approval",
             tagIds: null,
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
