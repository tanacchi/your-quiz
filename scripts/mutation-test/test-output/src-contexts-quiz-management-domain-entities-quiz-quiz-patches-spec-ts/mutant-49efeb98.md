# Mutant 49efeb98 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1647
**Stable ID**: 49efeb98
**Location**: L26:11–L26:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1647
@@ -22,9 +22,9 @@
     id: "quiz-123",
     question: "Is TypeScript a superset of JavaScript?",
     answerType: "boolean",
     solution: {
-      id: "solution-456",
+      id: "",
       value: true,
     },
     explanation: "TypeScript adds static typing to JavaScript",
     status: "pending_approval",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
