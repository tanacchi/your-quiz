# Mutant bcb21e10 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1269
**Stable ID**: bcb21e10
**Location**: L459:24–L459:45

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1269
@@ -455,9 +455,9 @@
             answerType: "boolean",
             solution: { id: "sol-cross", value: true },
             status: "approved", // Invalid without approvedAt
             creatorId: "creator-cross",
-            createdAt: "2023-12-01 10:00:00",
+            createdAt: "",
             // Missing approvedAt for approved status
           });
 
           const result = Quiz.fromDraft(draft);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
