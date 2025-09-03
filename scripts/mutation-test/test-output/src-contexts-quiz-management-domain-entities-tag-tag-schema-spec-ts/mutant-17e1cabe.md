# Mutant 17e1cabe Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7237
**Stable ID**: 17e1cabe
**Location**: L434:78–L474:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7237
@@ -430,49 +430,9 @@
       });
     });
 
     describe("Combined Validation Errors", () => {
-      it("should report both duplicate IDs and self-reference errors", () => {
-        const dataWithBothErrors = {
-          ...validTagData,
-          id: "tag-problem",
-          relatedTags: [
-            {
-              relationType: "category" as const,
-              id: "tag-problem", // self-reference
-              name: "Problem Tag 1",
-            },
-            {
-              relationType: "synonym" as const,
-              id: "tag-dup",
-              name: "Duplicate Tag 1",
-            },
-            {
-              relationType: "related" as const,
-              id: "tag-dup", // duplicate
-              name: "Duplicate Tag 2",
-            },
-          ],
-        };
-        const result = TagSchema.safeParse(dataWithBothErrors);
-        expect(result.success).toBe(false);
-
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
-      });
+      it("should report both duplicate IDs and self-reference errors", () => {});
     });
   });
 
   describe("Edge Cases and Boundary Values", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
