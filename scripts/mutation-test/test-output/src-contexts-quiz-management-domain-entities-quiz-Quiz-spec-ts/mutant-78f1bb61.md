# Mutant 78f1bb61 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1375
**Stable ID**: 78f1bb61
**Location**: L624:62–L638:12

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1375
@@ -620,23 +620,9 @@
 
           // Both methods should return identical results
           expect(fromDraftResult.isOk()).toBe(commitResult.isOk());
 
-          if (fromDraftResult.isOk() && commitResult.isOk()) {
-            const fromDraftQuiz = fromDraftResult.value;
-            const commitQuiz = commitResult.value;
-
-            expect(fromDraftQuiz.get("id")).toBe(commitQuiz.get("id"));
-            expect(fromDraftQuiz.get("question")).toBe(
-              commitQuiz.get("question"),
-            );
-            expect(fromDraftQuiz.get("answerType")).toBe(
-              commitQuiz.get("answerType"),
-            );
-            expect(fromDraftQuiz.getSolution().get("value")).toBe(
-              commitQuiz.getSolution().get("value"),
-            );
-          }
+          if (fromDraftResult.isOk() && commitResult.isOk()) {}
         });
       });
     });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
