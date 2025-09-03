# Mutant 6e5dc535 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3902
**Stable ID**: 6e5dc535
**Location**: L633:70–L645:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3902
@@ -629,21 +629,9 @@
 
       it.each([
         ["existing field", "question", ""],
         ["non-existent field", "nonexistent", ""],
-      ])("should get errors for %s", (_desc, field, invalidValue) => {
-        if (field === "question") {
-          draft.update("question", invalidValue);
-        }
-
-        const fieldErrors = draft.getErrors(field);
-
-        if (field === "question") {
-          expect(fieldErrors.length).toBeGreaterThan(0);
-        } else {
-          expect(fieldErrors).toEqual([]);
-        }
-      });
+      ])("should get errors for %s", (_desc, field, invalidValue) => {});
     });
   });
 
   describe("Type Safety", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
