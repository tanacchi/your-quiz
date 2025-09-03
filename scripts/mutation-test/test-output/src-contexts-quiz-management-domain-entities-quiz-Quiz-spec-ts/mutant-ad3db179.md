# Mutant ad3db179 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1371
**Stable ID**: ad3db179
**Location**: L615:24–L615:45

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1371
@@ -611,9 +611,9 @@
             answerType: "boolean",
             solution: { id: "sol-equivalent", value: true },
             status: "pending_approval",
             creatorId: "creator-equivalent",
-            createdAt: "2023-12-01 10:00:00",
+            createdAt: "",
           });
 
           const fromDraftResult = Quiz.fromDraft(draft);
           const commitResult = draft.commit();
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
