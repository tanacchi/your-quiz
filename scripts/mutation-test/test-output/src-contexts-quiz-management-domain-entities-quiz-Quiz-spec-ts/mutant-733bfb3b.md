# Mutant 733bfb3b Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1066
**Stable ID**: 733bfb3b
**Location**: L210:64–L214:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1066
@@ -206,13 +206,9 @@
       });
     });
 
     describe("Solution Integration", () => {
-      it("should provide access to integrated solution", () => {
-        const solution = quiz.getSolution();
-        expect(solution.get("id")).toBe("solution-1");
-        expect(solution.get("value")).toBe(true);
-      });
+      it("should provide access to integrated solution", () => {});
 
       it("should work with solution answer checking", () => {
         const solution = quiz.getSolution();
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
