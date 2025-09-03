# Mutant b209e35c Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1415
**Stable ID**: b209e35c
**Location**: L668:30–L678:12

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1415
@@ -664,19 +664,9 @@
               "question" in patch,
           );
           expect(questionPatch).toBeDefined();
 
-          if (questionPatch) {
-            draft.applyPatches([questionPatch]);
-
-            // After applying the question patch, question should be fixed
-            const updatedQuestion = draft.get("question");
-            expect(updatedQuestion).not.toBe("   ");
-            expect(typeof updatedQuestion).toBe("string");
-            if (typeof updatedQuestion === "string") {
-              expect(updatedQuestion.trim().length).toBeGreaterThan(0);
-            }
-          }
+          if (questionPatch) {}
         });
 
         it("should apply multiple patches correctly", () => {
           const draft = new Quiz.Draft();
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
