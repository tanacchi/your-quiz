# Mutant d24f07e4 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 1396
**Stable ID**: d24f07e4
**Location**: L651:50–L651:54

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1396
@@ -647,9 +647,9 @@
           draft.with({
             id: "quiz-single-patch",
             question: "   ", // Whitespace only - will need patch
             answerType: "boolean",
-            solution: { id: "sol-single", value: true },
+            solution: { id: "sol-single", value: false },
             status: "pending_approval",
             creatorId: "creator-single",
             createdAt: "2023-12-01 10:00:00",
           });
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
