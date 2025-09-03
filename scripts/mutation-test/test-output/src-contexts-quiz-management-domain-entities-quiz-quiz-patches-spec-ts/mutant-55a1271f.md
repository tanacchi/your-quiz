# Mutant 55a1271f Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2463
**Stable ID**: 55a1271f
**Location**: L760:30–L760:40

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2463
@@ -756,9 +756,9 @@
       ];
 
       const patches = suggestQuizPatches(input, issues);
       const patched = applyEntityPatches(input, patches);
-      if (typeof patched === "function") {
+      if (typeof patched === "") {
         throw new Error("patched must be an object.");
       }
       // Should be mostly the same, except consistency patches might apply
       expect(patched.id).toBe(input.id);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
