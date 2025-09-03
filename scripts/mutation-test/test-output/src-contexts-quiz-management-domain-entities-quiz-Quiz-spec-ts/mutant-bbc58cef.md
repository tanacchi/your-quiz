# Mutant bbc58cef Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 1305
**Stable ID**: bbc58cef
**Location**: L515:54–L515:58

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1305
@@ -511,9 +511,9 @@
           draft.with({
             id: "quiz-multi-patches",
             question: "  ",
             answerType: "bool" as unknown as "boolean",
-            solution: { id: "sol-multi-null", value: true },
+            solution: { id: "sol-multi-null", value: false },
             status: "pending_approval",
             creatorId: "creator-multi",
             createdAt: "2023-12-01 10:00:00",
           });
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
