# Mutant a7bd7861 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4053
**Stable ID**: a7bd7861
**Location**: L27:23–L27:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4053
@@ -23,9 +23,9 @@
     question: "What is TypeScript?",
     answerType: "single_choice",
     solutionId: "solution-456",
     explanation: "TypeScript is a superset of JavaScript",
-    tagIds: ["tag-1", "tag-2"],
+    tagIds: ["tag-1", ""],
     status: "pending_approval",
     creatorId: "creator-789",
     createdAt: "2023-12-01T10:00:00.000Z",
   };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
