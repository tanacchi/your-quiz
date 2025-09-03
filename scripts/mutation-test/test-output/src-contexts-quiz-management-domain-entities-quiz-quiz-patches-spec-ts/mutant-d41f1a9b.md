# Mutant d41f1a9b Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2388
**Stable ID**: d41f1a9b
**Location**: L684:24–L684:50

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2388
@@ -680,9 +680,9 @@
             answerType: "boolean" as const,
             solution: { id: "solution-123", value: true },
             status: "pending_approval" as const,
             creatorId: "creator-789",
-            createdAt: "2023-12-01T10:00:00.000Z",
+            createdAt: "",
           };
 
           const issues: Issue[] = [
             {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
