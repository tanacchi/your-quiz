# Mutant 714ffb82 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1462
**Stable ID**: 714ffb82
**Location**: L736:24–L736:45

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1462
@@ -732,9 +732,9 @@
             answerType: "boolean",
             solution: { id: "sol-revalidate", value: true },
             status: "pending_approval",
             creatorId: "creator-revalidate",
-            createdAt: "2023-12-01 10:00:00",
+            createdAt: "",
           });
 
           expect(draft.hasErrors()).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
