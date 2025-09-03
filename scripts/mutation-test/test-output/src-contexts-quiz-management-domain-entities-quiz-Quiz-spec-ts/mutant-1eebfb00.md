# Mutant 1eebfb00 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 1362
**Stable ID**: 1eebfb00
**Location**: L608:22–L616:12

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1362
@@ -604,17 +604,9 @@
         });
 
         it("should be equivalent to draft.commit()", () => {
           const draft = new Quiz.Draft();
-          draft.with({
-            id: "quiz-equivalent",
-            question: "Are fromDraft and commit equivalent?",
-            answerType: "boolean",
-            solution: { id: "sol-equivalent", value: true },
-            status: "pending_approval",
-            creatorId: "creator-equivalent",
-            createdAt: "2023-12-01 10:00:00",
-          });
+          draft.with({});
 
           const fromDraftResult = Quiz.fromDraft(draft);
           const commitResult = draft.commit();
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
