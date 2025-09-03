# Mutant 676ca8c9 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1466
**Stable ID**: 676ca8c9
**Location**: L749:53–L769:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1466
@@ -745,30 +745,10 @@
           const issuesAfterPatches = draft.getIssues();
           expect(Array.isArray(issuesAfterPatches)).toBe(true);
         });
 
-        it("should work with object patches", () => {
-          const draft = new Quiz.Draft();
-          draft.with({
-            id: "quiz-object-patch",
-            question: "Object patch test?",
-            answerType: "boolean",
-            solution: { id: "sol-obj", value: true },
-            status: "pending_approval",
-            creatorId: "creator-obj",
-            createdAt: "2023-12-01 10:00:00",
-          });
+        it("should work with object patches", () => {});
 
-          // Create an object patch that modifies explanation
-          const objectPatch = {
-            explanation: "Added by object patch",
-          };
-
-          draft.applyPatches([objectPatch]);
-
-          expect(draft.get("explanation")).toBe("Added by object patch");
-        });
-
         it("should handle patch application errors gracefully", () => {
           const draft = new Quiz.Draft();
           draft.with({
             id: "quiz-patch-error",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
