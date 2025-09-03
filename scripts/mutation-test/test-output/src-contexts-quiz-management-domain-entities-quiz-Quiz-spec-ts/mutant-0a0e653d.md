# Mutant 0a0e653d Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1247
**Stable ID**: 0a0e653d
**Location**: L435:24–L435:41

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1247
@@ -431,9 +431,9 @@
             question: "Valid question?",
             answerType: "boolean",
             // Missing solution
             status: "pending_approval",
-            creatorId: "creator-missing",
+            creatorId: "",
             createdAt: "2023-12-01 10:00:00",
           });
 
           const result = Quiz.fromDraft(draft);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
