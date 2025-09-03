# Mutant 4ada9025 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1209
**Stable ID**: 4ada9025
**Location**: L386:30–L400:12

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1209
@@ -382,23 +382,9 @@
 
           const result = Quiz.fromDraft(draft);
           expect(result.isOk()).toBe(true);
 
-          if (result.isOk()) {
-            const quiz = result.value;
-            expect(quiz.canBeUpdated()).toBe(true);
-            expect(quiz.canBeDeleted()).toBe(true);
-
-            // Test approval workflow
-            const approvedResult = quiz.approve("2023-12-02 10:00:00");
-            expect(approvedResult.isOk()).toBe(true);
-
-            if (approvedResult.isOk()) {
-              const approvedQuiz = approvedResult.value;
-              expect(approvedQuiz.get("status")).toBe("approved");
-              expect(approvedQuiz.canBeUpdated()).toBe(false);
-            }
-          }
+          if (result.isOk()) {}
         });
       });
 
       describe("Error Handling", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
