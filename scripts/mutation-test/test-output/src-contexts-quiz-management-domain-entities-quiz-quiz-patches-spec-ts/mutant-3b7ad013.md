# Mutant 3b7ad013 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 2386
**Stable ID**: 3b7ad013
**Location**: L681:52–L681:56

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2386
@@ -677,9 +677,9 @@
             question: "A".repeat(501),
             explanation: "B".repeat(1001),
             id: "quiz-123",
             answerType: "boolean" as const,
-            solution: { id: "solution-123", value: true },
+            solution: { id: "solution-123", value: false },
             status: "pending_approval" as const,
             creatorId: "creator-789",
             createdAt: "2023-12-01T10:00:00.000Z",
           };
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
