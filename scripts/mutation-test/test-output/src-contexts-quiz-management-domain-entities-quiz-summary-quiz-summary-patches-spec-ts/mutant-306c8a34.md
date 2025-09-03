# Mutant 306c8a34 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4154
**Stable ID**: 306c8a34
**Location**: L111:14–L111:37

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4154
@@ -107,9 +107,9 @@
         });
       });
     });
 
-    describe("suggestIdFieldPatches", () => {
+    describe("", () => {
       it.each([
         ["id field", "id"],
         ["solutionId field", "solutionId"],
         ["creatorId field", "creatorId"],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
