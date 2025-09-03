# Mutant c0f7c8fb Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3885
**Stable ID**: c0f7c8fb
**Location**: L621:40–L646:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3885
@@ -617,34 +617,9 @@
         expect(error.issues.length).toBeGreaterThan(0);
       });
     });
 
-    describe("Error management", () => {
-      it("should clear errors manually", () => {
-        draft.update("question", ""); // creates error
-        expect(draft.hasErrors()).toBe(true);
-
-        draft.clearErrors();
-        expect(draft.hasErrors()).toBe(false);
-      });
-
-      it.each([
-        ["existing field", "question", ""],
-        ["non-existent field", "nonexistent", ""],
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
-    });
+    describe("Error management", () => {});
   });
 
   describe("Type Safety", () => {
     it("should enforce return type constraints", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
