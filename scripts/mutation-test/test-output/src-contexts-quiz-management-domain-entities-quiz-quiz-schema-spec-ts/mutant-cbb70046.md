# Mutant cbb70046 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2781
**Stable ID**: cbb70046
**Location**: L23:18–L23:63

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2781
@@ -19,9 +19,9 @@
     id: "quiz-123",
     question: "Is TypeScript a superset of JavaScript?",
     answerType: "boolean",
     solution: validBooleanSolution,
-    explanation: "TypeScript adds static typing to JavaScript",
+    explanation: "",
     status: "pending_approval",
     creatorId: "creator-789",
     createdAt: "2023-12-01 10:00:00",
   };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
