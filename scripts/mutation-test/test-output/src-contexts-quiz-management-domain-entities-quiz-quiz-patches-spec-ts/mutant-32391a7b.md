# Mutant 32391a7b Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2403
**Stable ID**: 32391a7b
**Location**: L703:34–L703:44

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2403
@@ -699,9 +699,9 @@
 
           const patches = suggestQuizPatches(input, issues);
           const patched = applyEntityPatches(input, patches);
 
-          if (typeof patched === "function") {
+          if (typeof patched === "") {
             throw new Error("patched must be an object.");
           }
 
           expect(patched.question).toBe(`${"A".repeat(497)}...`);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
