# Mutant 73e42e8d Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4343
**Stable ID**: 73e42e8d
**Location**: L224:50–L227:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4343
@@ -220,12 +220,9 @@
         const result = suggestTagIdsPatches(null);
         expect(result).toEqual([{ tagIds: [] }]);
       });
 
-      it("should handle undefined tagIds", () => {
-        const result = suggestTagIdsPatches(undefined);
-        expect(result).toEqual([{ tagIds: [] }]);
-      });
+      it("should handle undefined tagIds", () => {});
 
       it("should handle array with mixed valid/invalid values", () => {
         const input = ["valid-tag", "", "  another-tag  ", 123, null];
         const result = suggestTagIdsPatches(input);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
