# Mutant d1a93586 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1331
**Stable ID**: d1a93586
**Location**: L553:24–L553:45

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1331
@@ -549,9 +549,9 @@
             answerType: "boolean" as const,
             solution: { id: "sol-preserve", value: true },
             status: "pending_approval" as const,
             creatorId: "creator-preserve",
-            createdAt: "2023-12-01 10:00:00",
+            createdAt: "",
           };
 
           draft.with({
             ...validData,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
