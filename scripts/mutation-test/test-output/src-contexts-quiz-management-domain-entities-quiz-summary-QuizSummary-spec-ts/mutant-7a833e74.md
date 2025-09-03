# Mutant 7a833e74 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3475
**Stable ID**: 7a833e74
**Location**: L179:50–L187:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3475
@@ -175,17 +175,9 @@
         ["null tagIds", { tagIds: null }, []],
         ["missing tagIds", {}, validQuizData.tagIds],
       ])(
         "should handle %s and default to empty array",
-        (_desc, modification, expectedTagIds) => {
-          const testData = {
-            ...(validQuizData as Record<string, unknown>),
-            ...modification,
-          };
-          const result = QuizSummary.from(testData);
-          const entity = result._unsafeUnwrap({ withStackTrace: true });
-          expect(entity.get("tagIds")).toEqual(expectedTagIds);
-        },
+        (_desc, modification, expectedTagIds) => {},
       );
     });
   });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
