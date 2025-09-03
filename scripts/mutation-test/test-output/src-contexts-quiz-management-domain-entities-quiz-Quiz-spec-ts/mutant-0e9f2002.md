# Mutant 0e9f2002 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1078
**Stable ID**: 0e9f2002
**Location**: L225:59–L237:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1078
@@ -221,21 +221,9 @@
         expect(typeof result).toBe("boolean");
         expect(result).toBe(false); // Placeholder implementation
       });
 
-      it("should provide boolean solution methods", () => {
-        const solution = quiz.getSolution();
-        expect(solution.isTrue()).toBe(true);
-        expect(solution.isFalse()).toBe(false);
-
-        const negatedResult = solution.negate();
-        expect(negatedResult.isOk()).toBe(true);
-
-        if (negatedResult.isOk()) {
-          const negatedSolution = negatedResult.value;
-          expect(negatedSolution.get("value")).toBe(false);
-        }
-      });
+      it("should provide boolean solution methods", () => {});
     });
 
     describe("Validation Methods", () => {
       it("should identify incomplete quiz", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
