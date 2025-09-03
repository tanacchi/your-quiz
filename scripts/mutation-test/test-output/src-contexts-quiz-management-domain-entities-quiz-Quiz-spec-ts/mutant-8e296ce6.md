# Mutant 8e296ce6 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1456
**Stable ID**: 8e296ce6
**Location**: L732:25–L732:34

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1456
@@ -728,9 +728,9 @@
           const draft = new Quiz.Draft();
           draft.with({
             id: "quiz-revalidate",
             question: "", // Invalid
-            answerType: "boolean",
+            answerType: "",
             solution: { id: "sol-revalidate", value: true },
             status: "pending_approval",
             creatorId: "creator-revalidate",
             createdAt: "2023-12-01 10:00:00",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
