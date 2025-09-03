# Mutant bf3b5ebd Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 1467
**Stable ID**: bf3b5ebd
**Location**: L751:22–L759:12

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1467
@@ -747,17 +747,9 @@
         });
 
         it("should work with object patches", () => {
           const draft = new Quiz.Draft();
-          draft.with({
-            id: "quiz-object-patch",
-            question: "Object patch test?",
-            answerType: "boolean",
-            solution: { id: "sol-obj", value: true },
-            status: "pending_approval",
-            creatorId: "creator-obj",
-            createdAt: "2023-12-01 10:00:00",
-          });
+          draft.with({});
 
           // Create an object patch that modifies explanation
           const objectPatch = {
             explanation: "Added by object patch",
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
