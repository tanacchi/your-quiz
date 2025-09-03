# Mutant 49ecbd27 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1398
**Stable ID**: 49ecbd27
**Location**: L653:24–L653:40

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1398
@@ -649,9 +649,9 @@
             question: "   ", // Whitespace only - will need patch
             answerType: "boolean",
             solution: { id: "sol-single", value: true },
             status: "pending_approval",
-            creatorId: "creator-single",
+            creatorId: "",
             createdAt: "2023-12-01 10:00:00",
           });
 
           expect(draft.hasErrors()).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
