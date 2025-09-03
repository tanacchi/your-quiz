# Mutant 60e6ccab Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1395
**Stable ID**: 60e6ccab
**Location**: L651:29–L651:41

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1395
@@ -647,9 +647,9 @@
           draft.with({
             id: "quiz-single-patch",
             question: "   ", // Whitespace only - will need patch
             answerType: "boolean",
-            solution: { id: "sol-single", value: true },
+            solution: { id: "", value: true },
             status: "pending_approval",
             creatorId: "creator-single",
             createdAt: "2023-12-01 10:00:00",
           });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
