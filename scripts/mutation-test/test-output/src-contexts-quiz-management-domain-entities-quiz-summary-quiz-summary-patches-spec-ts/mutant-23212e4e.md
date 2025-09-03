# Mutant 23212e4e Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4749
**Stable ID**: 23212e4e
**Location**: L658:52–L661:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4749
@@ -654,11 +654,8 @@
       expect(Array.isArray(materializedPatch.tagIds)).toBe(true);
       expect(materializedPatch.tagIds?.length).toBeLessThan(largeTagIds.length);
 
       // Check that empty strings were filtered out and strings were trimmed
-      materializedPatch.tagIds?.forEach((tagId) => {
-        expect(tagId).not.toBe("");
-        expect(tagId.trim()).toBe(tagId);
-      });
+      materializedPatch.tagIds?.forEach((tagId) => {});
     });
   });
 });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
