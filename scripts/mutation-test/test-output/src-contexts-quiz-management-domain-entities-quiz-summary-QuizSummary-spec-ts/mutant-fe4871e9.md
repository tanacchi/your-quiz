# Mutant fe4871e9 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 3477
**Stable ID**: fe4871e9
**Location**: L185:47–L185:71

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3477
@@ -181,9 +181,9 @@
             ...(validQuizData as Record<string, unknown>),
             ...modification,
           };
           const result = QuizSummary.from(testData);
-          const entity = result._unsafeUnwrap({ withStackTrace: true });
+          const entity = result._unsafeUnwrap({});
           expect(entity.get("tagIds")).toEqual(expectedTagIds);
         },
       );
     });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
