# Mutant b4be0adc Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 6484
**Stable ID**: b4be0adc
**Location**: L119:33–L121:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6484
@@ -115,11 +115,9 @@
         expect(result).toEqual([]);
       });
 
       it("should handle undefined input", () => {
-        const issues: Issue[] = [
-          { path: ["relatedTags"], code: "invalid", message: "Invalid" },
-        ];
+        const issues: Issue[] = [];
         const result = suggestTagPatches(undefined, issues);
         expect(result).toEqual([]);
       });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
