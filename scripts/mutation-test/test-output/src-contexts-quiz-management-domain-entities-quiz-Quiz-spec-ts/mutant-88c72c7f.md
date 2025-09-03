# Mutant 88c72c7f Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1434
**Stable ID**: 88c72c7f
**Location**: L688:21–L688:39

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1434
@@ -684,9 +684,9 @@
             id: "quiz-multi-patch",
             question: "  ", // Invalid
             answerType: "bool" as unknown as "boolean", // Invalid
             solution: { id: "sol-multi", value: true },
-            status: "pending_approval", // Invalid
+            status: "", // Invalid
             creatorId: "creator-multi",
             createdAt: "2023-12-01 10:00:00",
           });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
