# Mutant c72d3024 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3436
**Stable ID**: c72d3024
**Location**: L146:49–L170:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3436
@@ -142,34 +142,10 @@
         );
       });
     });
 
-    describe("Business rule validations", () => {
-      it.each([
-        [
-          "approved quiz must have approvedAt",
-          { status: "approved", approvedAt: undefined },
-          "Approved quiz must have approvedAt timestamp",
-        ],
-        [
-          "duplicate tag IDs",
-          { tagIds: [TagId.parse("tag-1"), TagId.parse("tag-1")] },
-          "Duplicate tag IDs are not allowed",
-        ],
-      ])("should enforce %s", (_desc, invalidFields, expectedErrorMessage) => {
-        const invalidData = {
-          ...(validQuizData as Record<string, unknown>),
-          ...invalidFields,
-        };
+    describe("Business rule validations", () => {});
 
-        const result = QuizSummary.from(invalidData);
-        const error = result._unsafeUnwrapErr({ withStackTrace: true });
-        expect(
-          error.issues.some((issue) => issue.message === expectedErrorMessage),
-        ).toBe(true);
-      });
-    });
-
     describe("Default value handling", () => {
       it.each([
         ["undefined tagIds", { tagIds: undefined }, []],
         ["null tagIds", { tagIds: null }, []],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
