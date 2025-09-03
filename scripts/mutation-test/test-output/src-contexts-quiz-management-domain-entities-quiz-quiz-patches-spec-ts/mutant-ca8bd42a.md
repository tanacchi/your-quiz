# Mutant ca8bd42a Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2371
**Stable ID**: ca8bd42a
**Location**: L663:34–L663:44

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2371
@@ -659,9 +659,9 @@
           ];
 
           const patches = suggestQuizPatches(input, issues);
           const patched = applyEntityPatches(input, patches);
-          if (typeof patched === "function") {
+          if (typeof patched === "") {
             throw new Error("patched must be an object.");
           }
           expect(patched.answerType).toBe("boolean");
           expect(patched.solution).toEqual({
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
