# Mutant 4bcfc0ba Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1307
**Stable ID**: 4bcfc0ba
**Location**: L517:24–L517:39

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1307
@@ -513,9 +513,9 @@
             question: "  ",
             answerType: "bool" as unknown as "boolean",
             solution: { id: "sol-multi-null", value: true },
             status: "pending_approval",
-            creatorId: "creator-multi",
+            creatorId: "",
             createdAt: "2023-12-01 10:00:00",
           });
 
           let iterationCount = 0;
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
