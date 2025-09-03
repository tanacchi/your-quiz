# Mutant 0a68f555 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 1648
**Stable ID**: 0a68f555
**Location**: L27:14–L27:18

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1648
@@ -23,9 +23,9 @@
     question: "Is TypeScript a superset of JavaScript?",
     answerType: "boolean",
     solution: {
       id: "solution-456",
-      value: true,
+      value: false,
     },
     explanation: "TypeScript adds static typing to JavaScript",
     status: "pending_approval",
     creatorId: "creator-789",
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
