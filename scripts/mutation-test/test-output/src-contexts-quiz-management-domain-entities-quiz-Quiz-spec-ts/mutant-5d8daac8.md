# Mutant 5d8daac8 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1063
**Stable ID**: 5d8daac8
**Location**: L209:14–L209:36

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1063
@@ -205,9 +205,9 @@
         expect(approvedQuiz.canBeDeleted()).toBe(false);
       });
     });
 
-    describe("Solution Integration", () => {
+    describe("", () => {
       it("should provide access to integrated solution", () => {
         const solution = quiz.getSolution();
         expect(solution.get("id")).toBe("solution-1");
         expect(solution.get("value")).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
