# Mutant bd27a3f0 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1072
**Stable ID**: bd27a3f0
**Location**: L216:61–L223:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1072
@@ -212,17 +212,10 @@
         expect(solution.get("id")).toBe("solution-1");
         expect(solution.get("value")).toBe(true);
       });
 
-      it("should work with solution answer checking", () => {
-        const solution = quiz.getSolution();
+      it("should work with solution answer checking", () => {});
 
-        // Note: Currently returns false due to placeholder implementation
-        const result = solution.checkAnswer({ value: true });
-        expect(typeof result).toBe("boolean");
-        expect(result).toBe(false); // Placeholder implementation
-      });
-
       it("should provide boolean solution methods", () => {
         const solution = quiz.getSolution();
         expect(solution.isTrue()).toBe(true);
         expect(solution.isFalse()).toBe(false);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
