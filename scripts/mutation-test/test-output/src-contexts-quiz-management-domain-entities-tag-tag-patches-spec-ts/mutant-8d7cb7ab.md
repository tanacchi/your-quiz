# Mutant 8d7cb7ab Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 6513
**Stable ID**: 8d7cb7ab
**Location**: L158:33–L160:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6513
@@ -154,11 +154,9 @@
           createdAt: "2023-12-01T10:00:00.000Z",
           relatedTags: null, // This would normally trigger a patch
         };
 
-        const issues: Issue[] = [
-          { path: ["name"], code: "invalid", message: "Invalid name" }, // Different field
-        ];
+        const issues: Issue[] = [];
 
         const result = suggestTagPatches(input, issues);
         expect(result).toEqual([]);
       });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
