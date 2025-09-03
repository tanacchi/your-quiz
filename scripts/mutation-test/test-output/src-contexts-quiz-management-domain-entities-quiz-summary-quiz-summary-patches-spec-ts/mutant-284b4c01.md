# Mutant 284b4c01 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4593
**Stable ID**: 284b4c01
**Location**: L473:24–L473:50

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4593
@@ -469,9 +469,9 @@
             status: "pending" as unknown as "pending_approval",
             tagIds: null,
             solutionId: "solution-456",
             creatorId: "creator-789",
-            createdAt: "2023-12-01T10:00:00.000Z",
+            createdAt: "",
           };
 
           const issues: Issue[] = [
             { path: ["id"], code: "invalid", message: "Invalid id" },
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
