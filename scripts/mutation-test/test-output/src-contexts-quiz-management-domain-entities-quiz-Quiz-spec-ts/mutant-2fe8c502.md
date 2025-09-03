# Mutant 2fe8c502 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1084
**Stable ID**: 2fe8c502
**Location**: L233:35–L236:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1084
@@ -229,12 +229,9 @@
 
         const negatedResult = solution.negate();
         expect(negatedResult.isOk()).toBe(true);
 
-        if (negatedResult.isOk()) {
-          const negatedSolution = negatedResult.value;
-          expect(negatedSolution.get("value")).toBe(false);
-        }
+        if (negatedResult.isOk()) {}
       });
     });
 
     describe("Validation Methods", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
