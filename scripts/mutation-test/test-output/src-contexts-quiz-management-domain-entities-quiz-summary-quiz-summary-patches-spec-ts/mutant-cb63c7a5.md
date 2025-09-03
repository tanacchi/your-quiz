# Mutant cb63c7a5 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: MethodExpression
**Original ID**: 4751
**Stable ID**: cb63c7a5
**Location**: L660:16–L660:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4751
@@ -656,9 +656,9 @@
 
       // Check that empty strings were filtered out and strings were trimmed
       materializedPatch.tagIds?.forEach((tagId) => {
         expect(tagId).not.toBe("");
-        expect(tagId.trim()).toBe(tagId);
+        expect(tagId).toBe(tagId);
       });
     });
   });
 });
```

## Hint

ミューテータ "MethodExpression" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
