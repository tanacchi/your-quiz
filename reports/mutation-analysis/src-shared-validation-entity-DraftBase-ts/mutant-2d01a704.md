# Mutant 2d01a704 Report

**File**: src/shared/validation/entity/DraftBase.ts
**Mutator**: EqualityOperator
**Original ID**: 756
**Stable ID**: 2d01a704
**Location**: L170:26–L170:55

## Diff

```diff
Index: src/shared/validation/entity/DraftBase.ts
===================================================================
--- src/shared/validation/entity/DraftBase.ts	original
+++ src/shared/validation/entity/DraftBase.ts	mutated #756
@@ -166,8 +166,8 @@
    */
   getErrors(path: string): string[] {
     const issues = this.getIssues();
     return issues
-      .filter((issue) => issue.path.join(".") === path)
+      .filter((issue) => issue.path.join(".") !== path)
       .map((issue) => issue.message);
   }
 }
```

## Hint

等価演算子が置換されています（==/=== ⇄ !=/!==）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。