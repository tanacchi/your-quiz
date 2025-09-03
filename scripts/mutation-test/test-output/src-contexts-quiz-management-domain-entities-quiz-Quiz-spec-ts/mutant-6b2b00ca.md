# Mutant 6b2b00ca Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1503
**Stable ID**: 6b2b00ca
**Location**: L798:47–L813:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1503
@@ -794,25 +794,10 @@
     });
   });
 
   describe("Patch System", () => {
-    it("should suggest question fixes", () => {
-      const result = Quiz.from({
-        ...validQuizData,
-        question: "   ",
-      });
+    it("should suggest question fixes", () => {});
 
-      expect(result.isErr()).toBe(true);
-
-      if (result.isErr()) {
-        const questionPatch = result.error.patches.find(
-          (patch) =>
-            typeof patch === "object" && patch !== null && "question" in patch,
-        );
-        expect(questionPatch).toBeDefined();
-      }
-    });
-
     it("should suggest answer type fixes", () => {
       const result = Quiz.from({
         ...validQuizData,
         answerType: "bool",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
