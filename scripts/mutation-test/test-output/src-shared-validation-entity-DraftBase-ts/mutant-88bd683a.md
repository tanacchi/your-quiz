# Mutant 88bd683a Report

**File**: src/shared/validation/entity/DraftBase.ts
**Mutator**: ConditionalExpression
**Original ID**: 10323
**Stable ID**: 88bd683a
**Location**: L170:26–L170:55

## Diff

```diff
Index: src/shared/validation/entity/DraftBase.ts
===================================================================
--- src/shared/validation/entity/DraftBase.ts	original
+++ src/shared/validation/entity/DraftBase.ts	mutated #10323
@@ -166,8 +166,8 @@
    */
   getErrors(path: string): string[] {
     const issues = this.getIssues();
     return issues
-      .filter((issue) => issue.path.join(".") === path)
+      .filter((issue) => true)
       .map((issue) => issue.message);
   }
 }
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
