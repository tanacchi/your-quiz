# Mutant c2e8fecd Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4632
**Stable ID**: c2e8fecd
**Location**: L521:24–L521:50

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4632
@@ -517,9 +517,9 @@
             answerType: "single_choice" as const,
             solutionId: "solution-456",
             status: "pending_approval" as const,
             creatorId: "creator-789",
-            createdAt: "2023-12-01T10:00:00.000Z",
+            createdAt: "",
           };
 
           const issues: Issue[] = [
             { path: ["tagIds"], code: "invalid", message: "Invalid tagIds" },
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
