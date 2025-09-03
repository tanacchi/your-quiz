# Mutant 27bf2e6b Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1476
**Stable ID**: 27bf2e6b
**Location**: L758:24–L758:45

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1476
@@ -754,9 +754,9 @@
             answerType: "boolean",
             solution: { id: "sol-obj", value: true },
             status: "pending_approval",
             creatorId: "creator-obj",
-            createdAt: "2023-12-01 10:00:00",
+            createdAt: "",
           });
 
           // Create an object patch that modifies explanation
           const objectPatch = {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
