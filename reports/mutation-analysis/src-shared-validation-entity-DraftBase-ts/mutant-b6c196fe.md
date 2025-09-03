# Mutant b6c196fe Report

**File**: src/shared/validation/entity/DraftBase.ts
**Mutator**: StringLiteral
**Original ID**: 757
**Stable ID**: b6c196fe
**Location**: L170:42–L170:45

## Diff

```diff
Index: src/shared/validation/entity/DraftBase.ts
===================================================================
--- src/shared/validation/entity/DraftBase.ts	original
+++ src/shared/validation/entity/DraftBase.ts	mutated #757
@@ -166,8 +166,8 @@
    */
   getErrors(path: string): string[] {
     const issues = this.getIssues();
     return issues
-      .filter((issue) => issue.path.join(".") === path)
+      .filter((issue) => issue.path.join("") === path)
       .map((issue) => issue.message);
   }
 }
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。