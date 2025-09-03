# Mutant 1fe2fb27 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 1073
**Stable ID**: 1fe2fb27
**Location**: L220:45–L220:60

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1073
@@ -216,9 +216,9 @@
       it("should work with solution answer checking", () => {
         const solution = quiz.getSolution();
 
         // Note: Currently returns false due to placeholder implementation
-        const result = solution.checkAnswer({ value: true });
+        const result = solution.checkAnswer({});
         expect(typeof result).toBe("boolean");
         expect(result).toBe(false); // Placeholder implementation
       });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
