# Mutant 9cb00159 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 2401
**Stable ID**: 9cb00159
**Location**: L703:15–L703:44

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2401
@@ -699,9 +699,9 @@
 
           const patches = suggestQuizPatches(input, issues);
           const patched = applyEntityPatches(input, patches);
 
-          if (typeof patched === "function") {
+          if (false) {
             throw new Error("patched must be an object.");
           }
 
           expect(patched.question).toBe(`${"A".repeat(497)}...`);
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
