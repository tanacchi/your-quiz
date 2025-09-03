# Mutant 21e720be Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5599
**Stable ID**: 21e720be
**Location**: L210:38–L213:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5599
@@ -206,12 +206,9 @@
         undefined,
         123,
       ];
 
-      testCases.forEach((attempt) => {
-        const result = solution.checkAnswer(attempt);
-        expect(result).toBe(false);
-      });
+      testCases.forEach((attempt) => {});
     });
   });
 
   describe("Draft Usage", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
