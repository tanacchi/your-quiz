# Mutant 81d43db4 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4389
**Stable ID**: 81d43db4
**Location**: L278:12–L278:57

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4389
@@ -274,9 +274,9 @@
 
           expect(patched.tagIds).toEqual(["valid", "trimmed"]);
         });
 
-        it("should materialize function patch correctly", () => {
+        it("", () => {
           const input = ["valid", "", " trimmed "];
           const patches = suggestTagIdsPatches(input);
           expect(patches).toHaveLength(1);
           const patch = patches[0];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
