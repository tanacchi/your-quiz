# Mutant 4b0379e0 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: MethodExpression
**Original ID**: 993
**Stable ID**: 4b0379e0
**Location**: L113:34–L115:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #993
@@ -109,11 +109,9 @@
       const result = Quiz.from(noSolutionData);
       expect(result.isErr()).toBe(true);
 
       if (result.isErr()) {
-        const hasSolutionIssue = result.error.issues.some(
-          (issue) => issue.path[0] === "solution",
-        );
+        const hasSolutionIssue = result.error.issues.every(issue => issue.path[0] === "solution");
         expect(hasSolutionIssue).toBe(true);
       }
     });
   });
```

## Hint

ミューテータ "MethodExpression" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
