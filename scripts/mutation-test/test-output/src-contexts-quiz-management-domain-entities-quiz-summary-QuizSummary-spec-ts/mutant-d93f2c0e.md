# Mutant d93f2c0e Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3881
**Stable ID**: d93f2c0e
**Location**: L607:67–L618:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3881
@@ -603,20 +603,9 @@
         ["empty question", { question: "" }],
         ["invalid answerType", { answerType: "invalid" }],
         ["missing creatorId", { creatorId: undefined }],
         ["missing solutionId", { solutionId: undefined }],
-      ])("should fail to commit with %s", (_desc, invalidData) => {
-        draft.with({
-          ...(validQuizData as Record<string, unknown>),
-          ...invalidData,
-        } as Parameters<typeof draft.with>[0]);
-
-        const result = draft.commit();
-
-        const error = result._unsafeUnwrapErr({ withStackTrace: true });
-        expect(error).toBeDefined();
-        expect(error.issues.length).toBeGreaterThan(0);
-      });
+      ])("should fail to commit with %s", (_desc, invalidData) => {});
     });
 
     describe("Error management", () => {
       it("should clear errors manually", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
