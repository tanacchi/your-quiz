# Mutant 6e7a6e8b Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: UpdateOperator
**Original ID**: 1318
**Stable ID**: 6e7a6e8b
**Location**: L530:13–L530:29

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1318
@@ -526,9 +526,9 @@
             const patches = draft.getPatches();
             if (patches.length === 0) break;
 
             draft.applyPatches(patches);
-            iterationCount++;
+            iterationCount--;
           }
 
           expect(iterationCount).toBeLessThanOrEqual(maxIterations);
```

## Hint

ミューテータ "UpdateOperator" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
