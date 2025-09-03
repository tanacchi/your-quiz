# Mutant 1d8d3646 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6437
**Stable ID**: 1d8d3646
**Location**: L68:57–L80:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6437
@@ -64,21 +64,9 @@
 
           expect(patched.relatedTags).toEqual([]);
         });
 
-        it("should not modify valid relatedTags", () => {
-          const validRelatedTags = [
-            {
-              relationType: "synonym" as const,
-              id: "tag-syn",
-              name: "Synonym Tag",
-            },
-          ];
-          const input = { ...validTagInput, relatedTags: validRelatedTags };
-          const patches = suggestRelatedTagsPatches(input.relatedTags);
-
-          expect(patches).toEqual([]);
-        });
+        it("should not modify valid relatedTags", () => {});
       });
     });
   });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
