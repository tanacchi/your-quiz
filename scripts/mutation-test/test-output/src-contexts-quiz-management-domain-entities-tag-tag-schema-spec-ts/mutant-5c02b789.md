# Mutant 5c02b789 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 7207
**Stable ID**: 5c02b789
**Location**: L384:13–L384:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7207
@@ -380,9 +380,9 @@
         };
         const result = TagSchema.safeParse(dataWithSelfReference);
         expect(result.success).toBe(false);
 
-        if (!result.success) {
+        if (false) {
           const error = result.error as ZodError;
           const selfRefError = error.issues.find((issue) =>
             issue.path.includes("relatedTags"),
           );
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
