# Mutant 40872eb7 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4488
**Stable ID**: 40872eb7
**Location**: L397:19–L397:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4488
@@ -393,9 +393,9 @@
           explanation: "  explanation  ",
           solutionId: "  solution-456  ",
           creatorId: "  creator-789  ",
           answerType: "bool",
-          status: "pending",
+          status: "",
           tagIds: ["valid", "", " trimmed "],
           approvedAt: undefined,
         };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
