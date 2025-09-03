# Mutant 18fef5f1 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 987
**Stable ID**: 18fef5f1
**Location**: L103:76–L118:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #987
@@ -99,24 +99,9 @@
       const result = Quiz.from(inconsistentData);
       expect(result.isOk()).toBe(true);
     });
 
-    it("should validate solution requirement for boolean questions", () => {
-      const noSolutionData = {
-        ...validQuizData,
-        solution: null,
-      };
-
-      const result = Quiz.from(noSolutionData);
-      expect(result.isErr()).toBe(true);
-
-      if (result.isErr()) {
-        const hasSolutionIssue = result.error.issues.some(
-          (issue) => issue.path[0] === "solution",
-        );
-        expect(hasSolutionIssue).toBe(true);
-      }
-    });
+    it("should validate solution requirement for boolean questions", () => {});
   });
 
   describe("Business Logic", () => {
     let quiz: Quiz;
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
