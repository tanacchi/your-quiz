# Mutant 4ebd55f7 Report

**File**: src/shared/validation/entity/DraftBase.ts
**Mutator**: ArrowFunction
**Original ID**: 10327
**Stable ID**: 4ebd55f7
**Location**: L171:12–L171:36

## Diff

```diff
Index: src/shared/validation/entity/DraftBase.ts
===================================================================
--- src/shared/validation/entity/DraftBase.ts	original
+++ src/shared/validation/entity/DraftBase.ts	mutated #10327
@@ -167,7 +167,7 @@
   getErrors(path: string): string[] {
     const issues = this.getIssues();
     return issues
       .filter((issue) => issue.path.join(".") === path)
-      .map((issue) => issue.message);
+      .map(() => undefined);
   }
 }
```

## Hint

ミューテータ "ArrowFunction" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
