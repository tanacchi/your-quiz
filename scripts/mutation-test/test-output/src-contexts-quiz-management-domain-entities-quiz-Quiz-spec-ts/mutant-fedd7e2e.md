# Mutant fedd7e2e Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1071
**Stable ID**: fedd7e2e
**Location**: L216:10–L216:53

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1071
@@ -212,9 +212,9 @@
         expect(solution.get("id")).toBe("solution-1");
         expect(solution.get("value")).toBe(true);
       });
 
-      it("should work with solution answer checking", () => {
+      it("", () => {
         const solution = quiz.getSolution();
 
         // Note: Currently returns false due to placeholder implementation
         const result = solution.checkAnswer({ value: true });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
