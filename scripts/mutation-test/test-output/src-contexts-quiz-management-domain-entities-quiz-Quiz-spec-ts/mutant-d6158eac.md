# Mutant d6158eac Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1308
**Stable ID**: d6158eac
**Location**: L518:24–L518:45

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1308
@@ -514,9 +514,9 @@
             answerType: "bool" as unknown as "boolean",
             solution: { id: "sol-multi-null", value: true },
             status: "pending_approval",
             creatorId: "creator-multi",
-            createdAt: "2023-12-01 10:00:00",
+            createdAt: "",
           });
 
           let iterationCount = 0;
           const maxIterations = 5;
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
