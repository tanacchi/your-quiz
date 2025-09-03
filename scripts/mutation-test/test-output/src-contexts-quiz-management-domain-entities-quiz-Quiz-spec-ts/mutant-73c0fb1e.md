# Mutant 73c0fb1e Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: MethodExpression
**Original ID**: 1425
**Stable ID**: 73c0fb1e
**Location**: L676:22–L676:44

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1425
@@ -672,9 +672,9 @@
             const updatedQuestion = draft.get("question");
             expect(updatedQuestion).not.toBe("   ");
             expect(typeof updatedQuestion).toBe("string");
             if (typeof updatedQuestion === "string") {
-              expect(updatedQuestion.trim().length).toBeGreaterThan(0);
+              expect(updatedQuestion.length).toBeGreaterThan(0);
             }
           }
         });
```

## Hint

ミューテータ "MethodExpression" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
