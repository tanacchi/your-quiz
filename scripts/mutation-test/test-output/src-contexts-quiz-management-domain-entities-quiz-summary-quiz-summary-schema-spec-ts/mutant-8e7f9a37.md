# Mutant 8e7f9a37 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5367
**Stable ID**: 8e7f9a37
**Location**: L389:22–L389:73

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5367
@@ -385,9 +385,9 @@
         id: "quiz-complex-123",
         question: "Complex TypeScript question with unicode: 🚀",
         answerType: "multiple_choice" as const,
         solutionId: "solution-complex-456",
-        explanation: "Detailed explanation with special chars & unicode",
+        explanation: "",
         tagIds: ["typescript", "advanced", "web-dev"],
         status: "approved" as const,
         creatorId: "creator-expert-789",
         createdAt: "2023-12-01 10:00:00",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
