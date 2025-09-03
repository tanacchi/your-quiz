# Mutant 6f5d9be0 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4917
**Stable ID**: 6f5d9be0
**Location**: L20:18–L20:58

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #4917
@@ -16,9 +16,9 @@
     id: "quiz-123",
     question: "What is TypeScript?",
     answerType: "single_choice",
     solutionId: "solution-456",
-    explanation: "TypeScript is a superset of JavaScript",
+    explanation: "",
     tagIds: ["tag-1", "tag-2"],
     status: "pending_approval",
     creatorId: "creator-789",
     createdAt: "2023-12-01 10:00:00",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
