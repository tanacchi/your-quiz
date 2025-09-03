# Mutant 56c93c45 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2385
**Stable ID**: 56c93c45
**Location**: L681:29–L681:43

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2385
@@ -677,9 +677,9 @@
             question: "A".repeat(501),
             explanation: "B".repeat(1001),
             id: "quiz-123",
             answerType: "boolean" as const,
-            solution: { id: "solution-123", value: true },
+            solution: { id: "", value: true },
             status: "pending_approval" as const,
             creatorId: "creator-789",
             createdAt: "2023-12-01T10:00:00.000Z",
           };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
