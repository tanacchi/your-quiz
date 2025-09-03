# Mutant ac281506 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 2343
**Stable ID**: ac281506
**Location**: L623:15–L623:44

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2343
@@ -619,9 +619,9 @@
           ];
 
           const patches = suggestQuizPatches(input, issues);
           const patched = applyEntityPatches(input, patches);
-          if (typeof patched === "function") {
+          if (false) {
             throw new Error("patched must be an object.");
           }
           expect(patched.id).toBe("quiz-123");
           expect(patched.question).toBe("Sample boolean question?");
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
