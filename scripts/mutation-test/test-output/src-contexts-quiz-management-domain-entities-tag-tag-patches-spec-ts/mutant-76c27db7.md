# Mutant 76c27db7 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6563
**Stable ID**: 76c27db7
**Location**: L232:24–L232:45

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6563
@@ -228,9 +228,9 @@
             name: "TypeScript Programming",
             createdBy: "user-expert",
             createdAt: "2023-12-01T10:00:00.000Z",
             relatedTags: undefined,
-            extraData: "should be preserved", // This would be removed by strict schema, but patch doesn't affect it
+            extraData: "", // This would be removed by strict schema, but patch doesn't affect it
           };
 
           const issues: Issue[] = [
             {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
