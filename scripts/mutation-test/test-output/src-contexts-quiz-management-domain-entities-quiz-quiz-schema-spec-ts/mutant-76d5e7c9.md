# Mutant 76d5e7c9 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3216
**Stable ID**: 76d5e7c9
**Location**: L433:11–L433:127

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3216
@@ -429,9 +429,9 @@
           id: "solution-integration-456",
           value: true,
         },
         explanation:
-          "TypeScript provides static type checking at compile time, making it strongly typed compared to vanilla JavaScript.",
+          "",
         status: "approved" as const,
         creatorId: "creator-expert-789",
         createdAt: "2023-12-01 10:00:00",
         approvedAt: "2023-12-02 15:30:00",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
