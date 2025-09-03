# Mutant f959070a Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: MethodExpression
**Original ID**: 7255
**Stable ID**: f959070a
**Location**: L461:37–L463:12

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7255
@@ -457,11 +457,9 @@
         expect(result.success).toBe(false);
 
         if (!result.success) {
           const error = result.error as ZodError;
-          const relatedTagsErrors = error.issues.filter((issue) =>
-            issue.path.includes("relatedTags"),
-          );
+          const relatedTagsErrors = error.issues;
           expect(relatedTagsErrors).toHaveLength(2); // Both errors should be present
 
           const errorMessages = relatedTagsErrors.map((err) => err.message);
           expect(errorMessages).toContain(
```

## Hint

ミューテータ "MethodExpression" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
