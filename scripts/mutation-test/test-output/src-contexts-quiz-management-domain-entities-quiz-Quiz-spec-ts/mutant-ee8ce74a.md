# Mutant ee8ce74a Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 1288
**Stable ID**: ee8ce74a
**Location**: L482:51–L482:55

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1288
@@ -478,9 +478,9 @@
           draft.with({
             id: "quiz-patches",
             question: "   ", // Invalid whitespace-only question
             answerType: "bool" as unknown as "boolean", // Invalid answerType
-            solution: { id: "sol-patches", value: true },
+            solution: { id: "sol-patches", value: false },
             status: "pending_approval", // Valid status
             creatorId: "creator-patches",
             createdAt: "2023-12-01 10:00:00",
           });
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
