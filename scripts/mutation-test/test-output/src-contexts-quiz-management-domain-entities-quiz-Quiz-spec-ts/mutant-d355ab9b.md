# Mutant d355ab9b Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1323
**Stable ID**: d355ab9b
**Location**: L544:72–L574:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1323
@@ -540,39 +540,9 @@
             expect(finalResult.error.issues.length).toBeLessThanOrEqual(2);
           }
         });
 
-        it("should preserve valid fields when applying patches", () => {
-          const draft = new Quiz.Draft();
-          const validData = {
-            id: "quiz-preserve",
-            question: "Valid question to preserve?",
-            answerType: "boolean" as const,
-            solution: { id: "sol-preserve", value: true },
-            status: "pending_approval" as const,
-            creatorId: "creator-preserve",
-            createdAt: "2023-12-01 10:00:00",
-          };
-
-          draft.with({
-            ...validData,
-            explanation: undefined, // This might trigger patches in some cases
-          });
-
-          const originalQuestion = draft.get("question");
-          const originalId = draft.get("id");
-          const originalSolution = draft.get("solution");
-
-          if (draft.hasErrors()) {
-            const patches = draft.getPatches();
-            draft.applyPatches(patches);
-          }
-
-          // Valid fields should be preserved
-          expect(draft.get("question")).toBe(originalQuestion);
-          expect(draft.get("id")).toBe(originalId);
-          expect(draft.get("solution")).toEqual(originalSolution);
-        });
+        it("should preserve valid fields when applying patches", () => {});
       });
 
       describe("Edge Cases", () => {
         it("should handle empty draft", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
