# Mutant 77bacf8e Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4054
**Stable ID**: 77bacf8e
**Location**: L28:13–L28:31

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4054
@@ -24,9 +24,9 @@
     answerType: "single_choice",
     solutionId: "solution-456",
     explanation: "TypeScript is a superset of JavaScript",
     tagIds: ["tag-1", "tag-2"],
-    status: "pending_approval",
+    status: "",
     creatorId: "creator-789",
     createdAt: "2023-12-01T10:00:00.000Z",
   };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
