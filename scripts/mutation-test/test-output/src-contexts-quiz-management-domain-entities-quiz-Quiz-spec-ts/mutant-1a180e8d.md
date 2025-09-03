# Mutant 1a180e8d Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1370
**Stable ID**: 1a180e8d
**Location**: L614:24–L614:44

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1370
@@ -610,9 +610,9 @@
             question: "Are fromDraft and commit equivalent?",
             answerType: "boolean",
             solution: { id: "sol-equivalent", value: true },
             status: "pending_approval",
-            creatorId: "creator-equivalent",
+            creatorId: "",
             createdAt: "2023-12-01 10:00:00",
           });
 
           const fromDraftResult = Quiz.fromDraft(draft);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
