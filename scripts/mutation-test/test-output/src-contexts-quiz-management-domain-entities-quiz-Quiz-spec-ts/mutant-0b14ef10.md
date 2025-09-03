# Mutant 0b14ef10 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1065
**Stable ID**: 0b14ef10
**Location**: L210:10–L210:56

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1065
@@ -206,9 +206,9 @@
       });
     });
 
     describe("Solution Integration", () => {
-      it("should provide access to integrated solution", () => {
+      it("", () => {
         const solution = quiz.getSolution();
         expect(solution.get("id")).toBe("solution-1");
         expect(solution.get("value")).toBe(true);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
