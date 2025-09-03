# Mutant ee8d30b7 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3914
**Stable ID**: ee8d30b7
**Location**: L642:16–L644:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3914
@@ -638,11 +638,9 @@
         const fieldErrors = draft.getErrors(field);
 
         if (field === "question") {
           expect(fieldErrors.length).toBeGreaterThan(0);
-        } else {
-          expect(fieldErrors).toEqual([]);
-        }
+        } else {}
       });
     });
   });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
