# Mutant f10e8a1d Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 1074
**Stable ID**: f10e8a1d
**Location**: L220:54–L220:58

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1074
@@ -216,9 +216,9 @@
       it("should work with solution answer checking", () => {
         const solution = quiz.getSolution();
 
         // Note: Currently returns false due to placeholder implementation
-        const result = solution.checkAnswer({ value: true });
+        const result = solution.checkAnswer({ value: false });
         expect(typeof result).toBe("boolean");
         expect(result).toBe(false); // Placeholder implementation
       });
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
