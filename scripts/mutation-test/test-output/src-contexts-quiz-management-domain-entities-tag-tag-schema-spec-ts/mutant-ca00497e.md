# Mutant ca00497e Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 7163
**Stable ID**: ca00497e
**Location**: L314:13–L314:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7163
@@ -310,9 +310,9 @@
         };
         const result = TagSchema.safeParse(dataWithDuplicateRelatedTagIds);
         expect(result.success).toBe(false);
 
-        if (!result.success) {
+        if (result.success) {
           const error = result.error as ZodError;
           const duplicateError = error.issues.find((issue) =>
             issue.path.includes("relatedTags"),
           );
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
