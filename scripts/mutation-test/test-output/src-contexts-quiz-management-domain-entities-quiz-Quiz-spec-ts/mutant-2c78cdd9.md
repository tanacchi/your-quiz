# Mutant 2c78cdd9 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1291
**Stable ID**: 2c78cdd9
**Location**: L485:24–L485:45

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1291
@@ -481,9 +481,9 @@
             answerType: "bool" as unknown as "boolean", // Invalid answerType
             solution: { id: "sol-patches", value: true },
             status: "pending_approval", // Valid status
             creatorId: "creator-patches",
-            createdAt: "2023-12-01 10:00:00",
+            createdAt: "",
           });
 
           expect(draft.hasErrors()).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
