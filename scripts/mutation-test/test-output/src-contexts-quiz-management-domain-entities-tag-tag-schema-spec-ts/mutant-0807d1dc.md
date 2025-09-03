# Mutant 0807d1dc Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7254
**Stable ID**: 0807d1dc
**Location**: L459:30–L473:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7254
@@ -455,23 +455,9 @@
         };
         const result = TagSchema.safeParse(dataWithBothErrors);
         expect(result.success).toBe(false);
 
-        if (!result.success) {
-          const error = result.error as ZodError;
-          const relatedTagsErrors = error.issues.filter((issue) =>
-            issue.path.includes("relatedTags"),
-          );
-          expect(relatedTagsErrors).toHaveLength(2); // Both errors should be present
-
-          const errorMessages = relatedTagsErrors.map((err) => err.message);
-          expect(errorMessages).toContain(
-            "Duplicate related tag IDs are not allowed",
-          );
-          expect(errorMessages).toContain(
-            "Tag cannot reference itself in related tags",
-          );
-        }
+        if (!result.success) {}
       });
     });
   });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
