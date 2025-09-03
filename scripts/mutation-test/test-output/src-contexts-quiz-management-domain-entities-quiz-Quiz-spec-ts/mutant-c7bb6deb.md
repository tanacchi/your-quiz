# Mutant c7bb6deb Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 988
**Stable ID**: c7bb6deb
**Location**: L104:30–L107:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #988
@@ -100,12 +100,9 @@
       expect(result.isOk()).toBe(true);
     });
 
     it("should validate solution requirement for boolean questions", () => {
-      const noSolutionData = {
-        ...validQuizData,
-        solution: null,
-      };
+      const noSolutionData = {};
 
       const result = Quiz.from(noSolutionData);
       expect(result.isErr()).toBe(true);
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
