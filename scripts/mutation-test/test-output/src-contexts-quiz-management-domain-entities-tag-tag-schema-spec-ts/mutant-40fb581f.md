# Mutant 40fb581f Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 7164
**Stable ID**: 40fb581f
**Location**: L314:13–L314:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7164
@@ -310,9 +310,9 @@
         };
         const result = TagSchema.safeParse(dataWithDuplicateRelatedTagIds);
         expect(result.success).toBe(false);
 
-        if (!result.success) {
+        if (true) {
           const error = result.error as ZodError;
           const duplicateError = error.issues.find((issue) =>
             issue.path.includes("relatedTags"),
           );
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
