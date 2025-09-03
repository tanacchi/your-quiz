# Mutant db82e323 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3451
**Stable ID**: db82e323
**Location**: L158:79–L169:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3451
@@ -154,20 +154,9 @@
           "duplicate tag IDs",
           { tagIds: [TagId.parse("tag-1"), TagId.parse("tag-1")] },
           "Duplicate tag IDs are not allowed",
         ],
-      ])("should enforce %s", (_desc, invalidFields, expectedErrorMessage) => {
-        const invalidData = {
-          ...(validQuizData as Record<string, unknown>),
-          ...invalidFields,
-        };
-
-        const result = QuizSummary.from(invalidData);
-        const error = result._unsafeUnwrapErr({ withStackTrace: true });
-        expect(
-          error.issues.some((issue) => issue.message === expectedErrorMessage),
-        ).toBe(true);
-      });
+      ])("should enforce %s", (_desc, invalidFields, expectedErrorMessage) => {});
     });
 
     describe("Default value handling", () => {
       it.each([
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
