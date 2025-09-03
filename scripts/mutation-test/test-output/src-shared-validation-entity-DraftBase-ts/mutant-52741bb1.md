# Mutant 52741bb1 Report

**File**: src/shared/validation/entity/DraftBase.ts
**Mutator**: MethodExpression
**Original ID**: 10321
**Stable ID**: 52741bb1
**Location**: L169:12–L170:56

## Diff

```diff
Index: src/shared/validation/entity/DraftBase.ts
===================================================================
--- src/shared/validation/entity/DraftBase.ts	original
+++ src/shared/validation/entity/DraftBase.ts	mutated #10321
@@ -166,8 +166,7 @@
    */
   getErrors(path: string): string[] {
     const issues = this.getIssues();
     return issues
-      .filter((issue) => issue.path.join(".") === path)
       .map((issue) => issue.message);
   }
 }
```

## Hint

ミューテータ "MethodExpression" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
