# Mutant fec62e33 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1438
**Stable ID**: fec62e33
**Location**: L706:55–L725:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1438
@@ -702,29 +702,10 @@
           const finalErrorCount = draft.getIssues().length;
           expect(finalErrorCount).toBeLessThanOrEqual(initialErrorCount);
         });
 
-        it("should handle empty patches array", () => {
-          const draft = new Quiz.Draft();
-          draft.with({
-            id: "quiz-empty-patches",
-            question: "Valid question?",
-            answerType: "boolean",
-            solution: { id: "sol-empty", value: true },
-            status: "pending_approval",
-            creatorId: "creator-empty",
-            createdAt: "2023-12-01 10:00:00",
-          });
+        it("should handle empty patches array", () => {});
 
-          const originalState = { ...draft.state };
-
-          // Apply empty patches array
-          draft.applyPatches([]);
-
-          // State should remain unchanged
-          expect(draft.state).toEqual(originalState);
-        });
-
         it("should automatically revalidate after applying patches", () => {
           const draft = new Quiz.Draft();
           draft.with({
             id: "quiz-revalidate",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
