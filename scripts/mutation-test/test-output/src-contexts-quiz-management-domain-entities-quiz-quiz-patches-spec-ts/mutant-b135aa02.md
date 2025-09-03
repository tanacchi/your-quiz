# Mutant b135aa02 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1649
**Stable ID**: b135aa02
**Location**: L29:18–L29:63

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1649
@@ -25,9 +25,9 @@
     solution: {
       id: "solution-456",
       value: true,
     },
-    explanation: "TypeScript adds static typing to JavaScript",
+    explanation: "",
     status: "pending_approval",
     creatorId: "creator-789",
     createdAt: "2023-12-01T10:00:00.000Z",
   };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
