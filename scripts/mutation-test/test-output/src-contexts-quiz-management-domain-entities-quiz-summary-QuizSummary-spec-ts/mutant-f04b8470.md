# Mutant f04b8470 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 3478
**Stable ID**: f04b8470
**Location**: L185:65–L185:69

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3478
@@ -181,9 +181,9 @@
             ...(validQuizData as Record<string, unknown>),
             ...modification,
           };
           const result = QuizSummary.from(testData);
-          const entity = result._unsafeUnwrap({ withStackTrace: true });
+          const entity = result._unsafeUnwrap({ withStackTrace: false });
           expect(entity.get("tagIds")).toEqual(expectedTagIds);
         },
       );
     });
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
