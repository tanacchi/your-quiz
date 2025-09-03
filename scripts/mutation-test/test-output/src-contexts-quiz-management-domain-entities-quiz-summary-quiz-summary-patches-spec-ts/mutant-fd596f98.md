# Mutant fd596f98 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4337
**Stable ID**: fd596f98
**Location**: L219:10–L219:37

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4337
@@ -215,9 +215,9 @@
       });
     });
 
     describe("suggestTagIdsPatches", () => {
-      it("should handle null tagIds", () => {
+      it("", () => {
         const result = suggestTagIdsPatches(null);
         expect(result).toEqual([{ tagIds: [] }]);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
