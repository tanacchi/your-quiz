# Mutant 385feb43 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 1394
**Stable ID**: 385feb43
**Location**: L651:23–L651:56

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1394
@@ -647,9 +647,9 @@
           draft.with({
             id: "quiz-single-patch",
             question: "   ", // Whitespace only - will need patch
             answerType: "boolean",
-            solution: { id: "sol-single", value: true },
+            solution: {},
             status: "pending_approval",
             creatorId: "creator-single",
             createdAt: "2023-12-01 10:00:00",
           });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
