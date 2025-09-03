# Mutant 78d245c8 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 2461
**Stable ID**: 78d245c8
**Location**: L760:11–L760:40

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2461
@@ -756,9 +756,9 @@
       ];
 
       const patches = suggestQuizPatches(input, issues);
       const patched = applyEntityPatches(input, patches);
-      if (typeof patched === "function") {
+      if (false) {
         throw new Error("patched must be an object.");
       }
       // Should be mostly the same, except consistency patches might apply
       expect(patched.id).toBe(input.id);
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
