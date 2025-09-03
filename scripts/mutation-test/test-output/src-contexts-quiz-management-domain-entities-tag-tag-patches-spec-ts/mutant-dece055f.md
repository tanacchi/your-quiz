# Mutant dece055f Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 6579
**Stable ID**: dece055f
**Location**: L268:31–L271:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6579
@@ -264,12 +264,9 @@
       expect(result).toEqual([]);
     });
 
     it("should handle issues with non-string paths", () => {
-      const issues: Issue[] = [
-        { path: [0], code: "invalid", message: "Invalid" },
-        { path: ["relatedTags", 1], code: "invalid", message: "Invalid" },
-      ];
+      const issues: Issue[] = [];
 
       const result = suggestTagPatches(validTagInput, issues);
       expect(result).toEqual([]);
     });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
