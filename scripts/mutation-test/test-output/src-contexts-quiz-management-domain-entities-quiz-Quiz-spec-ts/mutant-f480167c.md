# Mutant f480167c Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1077
**Stable ID**: f480167c
**Location**: L225:10–L225:51

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1077
@@ -221,9 +221,9 @@
         expect(typeof result).toBe("boolean");
         expect(result).toBe(false); // Placeholder implementation
       });
 
-      it("should provide boolean solution methods", () => {
+      it("", () => {
         const solution = quiz.getSolution();
         expect(solution.isTrue()).toBe(true);
         expect(solution.isFalse()).toBe(false);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
