# Mutant ec2eeaed Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2315
**Stable ID**: ec2eeaed
**Location**: L598:24–L598:50

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2315
@@ -594,9 +594,9 @@
             answerType: "bool" as "boolean",
             status: "pending" as "pending_approval",
             solution: null as unknown as BooleanSolutionData,
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
