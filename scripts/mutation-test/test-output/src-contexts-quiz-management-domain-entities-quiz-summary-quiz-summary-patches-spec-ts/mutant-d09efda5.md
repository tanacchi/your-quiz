# Mutant d09efda5 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 4157
**Stable ID**: d09efda5
**Location**: L113:9–L113:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4157
@@ -109,9 +109,9 @@
     });
 
     describe("suggestIdFieldPatches", () => {
       it.each([
-        ["id field", "id"],
+        [],
         ["solutionId field", "solutionId"],
         ["creatorId field", "creatorId"],
       ])("should handle %s", (_desc, fieldName) => {
         const suggester = suggestIdFieldPatches(
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
