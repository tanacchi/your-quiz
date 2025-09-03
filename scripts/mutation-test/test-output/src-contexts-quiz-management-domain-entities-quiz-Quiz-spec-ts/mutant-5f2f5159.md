# Mutant 5f2f5159 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 975
**Stable ID**: 5f2f5159
**Location**: L83:42–L83:56

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #975
@@ -79,9 +79,9 @@
 
         // patches contains question fix
         const hasQuestionPatch = patches.some(
           (patch) =>
-            typeof patch === "object" && patch !== null && "question" in patch,
+            typeof patch === "object" && true && "question" in patch,
         );
         expect(hasQuestionPatch).toBe(true);
       }
     });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
