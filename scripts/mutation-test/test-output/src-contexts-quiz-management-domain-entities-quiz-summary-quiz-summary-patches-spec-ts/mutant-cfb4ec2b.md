# Mutant cfb4ec2b Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 4384
**Stable ID**: cfb4ec2b
**Location**: L272:15–L272:21

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4384
@@ -268,9 +268,9 @@
           };
           const patches = suggestTagIdsPatches(input.tagIds);
           expect(patches).toHaveLength(1);
           const patch = patches[0];
-          if (!patch) throw new Error("Expected patch to exist");
+          if (false) throw new Error("Expected patch to exist");
           const patched = applyEntityPatch(input, patch);
 
           expect(patched.tagIds).toEqual(["valid", "trimmed"]);
         });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
