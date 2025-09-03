# Mutant a2a92f07 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4159
**Stable ID**: a2a92f07
**Location**: L113:22–L113:26

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4159
@@ -109,9 +109,9 @@
     });
 
     describe("suggestIdFieldPatches", () => {
       it.each([
-        ["id field", "id"],
+        ["id field", ""],
         ["solutionId field", "solutionId"],
         ["creatorId field", "creatorId"],
       ])("should handle %s", (_desc, fieldName) => {
         const suggester = suggestIdFieldPatches(
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
