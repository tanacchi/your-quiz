# Mutant 5141ad9f Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4591
**Stable ID**: 5141ad9f
**Location**: L471:25–L471:39

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4591
@@ -467,9 +467,9 @@
             question: "",
             answerType: "bool" as unknown as "boolean",
             status: "pending" as unknown as "pending_approval",
             tagIds: null,
-            solutionId: "solution-456",
+            solutionId: "",
             creatorId: "creator-789",
             createdAt: "2023-12-01T10:00:00.000Z",
           };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
