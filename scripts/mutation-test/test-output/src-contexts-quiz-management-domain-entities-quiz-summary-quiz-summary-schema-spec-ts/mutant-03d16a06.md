# Mutant 03d16a06 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 4918
**Stable ID**: 03d16a06
**Location**: L21:13–L21:31

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #4918
@@ -17,9 +17,9 @@
     question: "What is TypeScript?",
     answerType: "single_choice",
     solutionId: "solution-456",
     explanation: "TypeScript is a superset of JavaScript",
-    tagIds: ["tag-1", "tag-2"],
+    tagIds: [],
     status: "pending_approval",
     creatorId: "creator-789",
     createdAt: "2023-12-01 10:00:00",
   };
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
