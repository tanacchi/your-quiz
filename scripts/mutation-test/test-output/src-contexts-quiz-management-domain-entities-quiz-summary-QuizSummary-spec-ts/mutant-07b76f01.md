# Mutant 07b76f01 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3430
**Stable ID**: 07b76f01
**Location**: L130:78–L143:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3430
@@ -126,22 +126,9 @@
           "invalid approvedAt format",
           { approvedAt: "invalid-date" },
           "Invalid SQLite datetime format",
         ],
-      ])("should reject %s", (_desc, invalidFields, expectedErrorMessage) => {
-        const invalidData = {
-          ...(validQuizData as Record<string, unknown>),
-          ...invalidFields,
-        };
-
-        const result = QuizSummary.from(invalidData);
-        const error = result._unsafeUnwrapErr({ withStackTrace: true });
-        expect(error.issues).toContainEqual(
-          expect.objectContaining({
-            message: expect.stringContaining(expectedErrorMessage),
-          }),
-        );
-      });
+      ])("should reject %s", (_desc, invalidFields, expectedErrorMessage) => {});
     });
 
     describe("Business rule validations", () => {
       it.each([
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
