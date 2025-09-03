# Mutant ab046d53 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 5586
**Stable ID**: ab046d53
**Location**: L190:33–L194:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5586
@@ -186,13 +186,9 @@
 
       expect(result).toBe(false);
       expect(consoleSpy).toHaveBeenCalledWith(
         "BooleanSolution.checkAnswer: NotImplemented",
-        expect.objectContaining({
-          solutionId: "solution-1",
-          expectedValue: true,
-          attempt: { value: true },
-        }),
+        expect.objectContaining({}),
       );
 
       consoleSpy.mockRestore();
     });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
