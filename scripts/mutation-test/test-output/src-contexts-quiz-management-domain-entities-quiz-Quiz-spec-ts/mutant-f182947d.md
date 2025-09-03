# Mutant f182947d Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 1439
**Stable ID**: f182947d
**Location**: L708:22–L716:12

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1439
@@ -704,17 +704,9 @@
         });
 
         it("should handle empty patches array", () => {
           const draft = new Quiz.Draft();
-          draft.with({
-            id: "quiz-empty-patches",
-            question: "Valid question?",
-            answerType: "boolean",
-            solution: { id: "sol-empty", value: true },
-            status: "pending_approval",
-            creatorId: "creator-empty",
-            createdAt: "2023-12-01 10:00:00",
-          });
+          draft.with({});
 
           const originalState = { ...draft.state };
 
           // Apply empty patches array
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
