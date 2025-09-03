# Mutant 928f6b07 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1223
**Stable ID**: 928f6b07
**Location**: L405:54–L425:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1223
@@ -401,30 +401,10 @@
         });
       });
 
       describe("Error Handling", () => {
-        it("should handle invalid draft data", () => {
-          const draft = new Quiz.Draft();
-          draft.with({
-            id: "quiz-invalid",
-            question: "", // Invalid empty question
-            answerType: "boolean",
-            solution: { id: "sol-invalid", value: true },
-            status: "pending_approval",
-            creatorId: "creator-invalid",
-            createdAt: "2023-12-01 10:00:00",
-          });
+        it("should handle invalid draft data", () => {});
 
-          const result = Quiz.fromDraft(draft);
-          expect(result.isErr()).toBe(true);
-
-          if (result.isErr()) {
-            expect(result.error.issues).toHaveLength(1);
-            expect(result.error.issues[0]?.path[0]).toBe("question");
-            expect(result.error.patches.length).toBeGreaterThan(0);
-          }
-        });
-
         it("should handle missing required fields", () => {
           const draft = new Quiz.Draft();
           draft.with({
             id: "quiz-missing",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
