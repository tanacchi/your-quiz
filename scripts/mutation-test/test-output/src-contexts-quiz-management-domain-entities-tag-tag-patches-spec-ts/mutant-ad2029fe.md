# Mutant ad2029fe Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6605
**Stable ID**: ad2029fe
**Location**: L292:42–L297:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6605
@@ -288,14 +288,9 @@
           message: "Invalid relatedTags",
         },
       ];
 
-      malformedInputs.forEach((input) => {
-        const result = suggestTagPatches(input, issues);
-        expect(Array.isArray(result)).toBe(true);
-        // Should suggest fixing to empty array
-        expect(result).toEqual([]);
-      });
+      malformedInputs.forEach((input) => {});
     });
 
     it("should preserve original input when no patches are applicable", () => {
       const input = { ...validTagInput };
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
