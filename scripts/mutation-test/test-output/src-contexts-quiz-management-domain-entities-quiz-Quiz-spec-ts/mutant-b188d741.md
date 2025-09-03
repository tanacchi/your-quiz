# Mutant b188d741 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1475
**Stable ID**: b188d741
**Location**: L757:24–L757:37

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1475
@@ -753,9 +753,9 @@
             question: "Object patch test?",
             answerType: "boolean",
             solution: { id: "sol-obj", value: true },
             status: "pending_approval",
-            creatorId: "creator-obj",
+            creatorId: "",
             createdAt: "2023-12-01 10:00:00",
           });
 
           // Create an object patch that modifies explanation
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
