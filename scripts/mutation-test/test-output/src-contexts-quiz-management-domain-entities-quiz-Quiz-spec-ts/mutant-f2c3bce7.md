# Mutant f2c3bce7 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1397
**Stable ID**: f2c3bce7
**Location**: L652:21–L652:39

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1397
@@ -648,9 +648,9 @@
             id: "quiz-single-patch",
             question: "   ", // Whitespace only - will need patch
             answerType: "boolean",
             solution: { id: "sol-single", value: true },
-            status: "pending_approval",
+            status: "",
             creatorId: "creator-single",
             createdAt: "2023-12-01 10:00:00",
           });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
