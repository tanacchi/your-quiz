# Mutant bd586e02 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 1707
**Stable ID**: bd586e02
**Location**: L63:15–L63:21

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1707
@@ -59,9 +59,9 @@
             question: "  Untrimmed question?  ",
           };
           const patches = suggestQuestionPatches(input.question);
           const patch = patches[0];
-          if (!patch) throw new Error("Expected patch to exist");
+          if (false) throw new Error("Expected patch to exist");
           const patched = applyEntityPatch(input, patch);
 
           expect(patched.question).toBe("Untrimmed question?");
         });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
