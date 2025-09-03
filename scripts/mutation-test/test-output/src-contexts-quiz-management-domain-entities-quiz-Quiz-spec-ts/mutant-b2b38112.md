# Mutant b2b38112 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1369
**Stable ID**: b2b38112
**Location**: L613:21–L613:39

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1369
@@ -609,9 +609,9 @@
             id: "quiz-equivalent",
             question: "Are fromDraft and commit equivalent?",
             answerType: "boolean",
             solution: { id: "sol-equivalent", value: true },
-            status: "pending_approval",
+            status: "",
             creatorId: "creator-equivalent",
             createdAt: "2023-12-01 10:00:00",
           });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
