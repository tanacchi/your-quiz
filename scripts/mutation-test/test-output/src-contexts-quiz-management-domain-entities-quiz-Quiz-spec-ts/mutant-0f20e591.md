# Mutant 0f20e591 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1088
**Stable ID**: 0f20e591
**Location**: L240:42–L249:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1088
@@ -236,18 +236,9 @@
         }
       });
     });
 
-    describe("Validation Methods", () => {
-      it("should identify incomplete quiz", () => {
-        const incompleteResult = Quiz.from({
-          ...validQuizData,
-          question: "",
-        });
-
-        expect(incompleteResult.isErr()).toBe(true);
-      });
-    });
+    describe("Validation Methods", () => {});
   });
 
   describe("Draft Usage", () => {
     it("should work with Draft pattern", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
