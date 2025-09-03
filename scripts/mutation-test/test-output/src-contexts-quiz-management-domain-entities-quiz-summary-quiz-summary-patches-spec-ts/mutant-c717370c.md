# Mutant c717370c Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4115
**Stable ID**: c717370c
**Location**: L77:14–L77:41

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4115
@@ -73,9 +73,9 @@
         });
       });
     });
 
-    describe("suggestExplanationPatches", () => {
+    describe("", () => {
       it.each([
         [
           "untrimmed explanation",
           "  Valid explanation  ",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
