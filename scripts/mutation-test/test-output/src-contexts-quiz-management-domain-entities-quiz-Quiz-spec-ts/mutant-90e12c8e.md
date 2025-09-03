# Mutant 90e12c8e Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1289
**Stable ID**: 90e12c8e
**Location**: L483:21–L483:39

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1289
@@ -479,9 +479,9 @@
             id: "quiz-patches",
             question: "   ", // Invalid whitespace-only question
             answerType: "bool" as unknown as "boolean", // Invalid answerType
             solution: { id: "sol-patches", value: true },
-            status: "pending_approval", // Valid status
+            status: "", // Valid status
             creatorId: "creator-patches",
             createdAt: "2023-12-01 10:00:00",
           });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
