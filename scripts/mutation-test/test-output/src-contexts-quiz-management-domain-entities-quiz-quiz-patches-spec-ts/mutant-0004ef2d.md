# Mutant 0004ef2d Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2345
**Stable ID**: 0004ef2d
**Location**: L623:34–L623:44

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2345
@@ -619,9 +619,9 @@
           ];
 
           const patches = suggestQuizPatches(input, issues);
           const patched = applyEntityPatches(input, patches);
-          if (typeof patched === "function") {
+          if (typeof patched === "") {
             throw new Error("patched must be an object.");
           }
           expect(patched.id).toBe("quiz-123");
           expect(patched.question).toBe("Sample boolean question?");
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
