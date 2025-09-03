# Mutant 6adb3c7f Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1290
**Stable ID**: 6adb3c7f
**Location**: L484:24–L484:41

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1290
@@ -480,9 +480,9 @@
             question: "   ", // Invalid whitespace-only question
             answerType: "bool" as unknown as "boolean", // Invalid answerType
             solution: { id: "sol-patches", value: true },
             status: "pending_approval", // Valid status
-            creatorId: "creator-patches",
+            creatorId: "",
             createdAt: "2023-12-01 10:00:00",
           });
 
           expect(draft.hasErrors()).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
