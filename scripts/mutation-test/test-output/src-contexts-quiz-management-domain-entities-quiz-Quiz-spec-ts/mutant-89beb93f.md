# Mutant 89beb93f Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1452
**Stable ID**: 89beb93f
**Location**: L727:76–L747:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1452
@@ -723,30 +723,10 @@
           // State should remain unchanged
           expect(draft.state).toEqual(originalState);
         });
 
-        it("should automatically revalidate after applying patches", () => {
-          const draft = new Quiz.Draft();
-          draft.with({
-            id: "quiz-revalidate",
-            question: "", // Invalid
-            answerType: "boolean",
-            solution: { id: "sol-revalidate", value: true },
-            status: "pending_approval",
-            creatorId: "creator-revalidate",
-            createdAt: "2023-12-01 10:00:00",
-          });
+        it("should automatically revalidate after applying patches", () => {});
 
-          expect(draft.hasErrors()).toBe(true);
-
-          const patches = draft.getPatches();
-          draft.applyPatches(patches);
-
-          // applyPatches should trigger revalidation automatically
-          const issuesAfterPatches = draft.getIssues();
-          expect(Array.isArray(issuesAfterPatches)).toBe(true);
-        });
-
         it("should work with object patches", () => {
           const draft = new Quiz.Draft();
           draft.with({
             id: "quiz-object-patch",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
