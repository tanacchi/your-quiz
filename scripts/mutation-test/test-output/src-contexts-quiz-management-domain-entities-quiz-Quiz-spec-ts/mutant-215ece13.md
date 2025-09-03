# Mutant 215ece13 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 980
**Stable ID**: 215ece13
**Location**: L89:56–L101:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #980
@@ -85,22 +85,10 @@
         expect(hasQuestionPatch).toBe(true);
       }
     });
 
-    it("should enforce answer type consistency", () => {
-      const inconsistentData = {
-        ...validQuizData,
-        answerType: "boolean" as const,
-        solution: {
-          id: "solution-1",
-          value: true,
-        },
-      };
+    it("should enforce answer type consistency", () => {});
 
-      const result = Quiz.from(inconsistentData);
-      expect(result.isOk()).toBe(true);
-    });
-
     it("should validate solution requirement for boolean questions", () => {
       const noSolutionData = {
         ...validQuizData,
         solution: null,
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
