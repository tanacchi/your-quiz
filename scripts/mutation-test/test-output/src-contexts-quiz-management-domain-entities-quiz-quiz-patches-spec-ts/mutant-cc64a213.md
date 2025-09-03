# Mutant cc64a213 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2196
**Stable ID**: cc64a213
**Location**: L503:22–L503:39

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2196
@@ -499,9 +499,9 @@
         const input = {
           id: "  quiz-123  ",
           question: "",
           explanation: "A".repeat(1001),
-          creatorId: "  creator-789  ",
+          creatorId: "",
           answerType: "bool",
           status: "pending",
           solution: null,
         };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
