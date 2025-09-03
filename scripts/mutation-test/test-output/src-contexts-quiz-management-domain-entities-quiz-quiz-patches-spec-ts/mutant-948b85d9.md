# Mutant 948b85d9 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1770
**Stable ID**: 948b85d9
**Location**: L126:14–L126:37

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1770
@@ -122,9 +122,9 @@
         });
       });
     });
 
-    describe("suggestIdFieldPatches", () => {
+    describe("", () => {
       it.each([
         ["id field", "id"],
         ["creatorId field", "creatorId"],
       ])("should handle %s", (_desc, fieldName) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
