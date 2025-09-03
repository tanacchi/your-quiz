# Mutant dba6a03d Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1248
**Stable ID**: dba6a03d
**Location**: L436:24–L436:45

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1248
@@ -432,9 +432,9 @@
             answerType: "boolean",
             // Missing solution
             status: "pending_approval",
             creatorId: "creator-missing",
-            createdAt: "2023-12-01 10:00:00",
+            createdAt: "",
           });
 
           const result = Quiz.fromDraft(draft);
           expect(result.isErr()).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
