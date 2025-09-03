# Mutant a4c7af38 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7186
**Stable ID**: a4c7af38
**Location**: L352:49–L431:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7186
@@ -348,89 +348,10 @@
         expect(result.success).toBe(false);
       });
     });
 
-    describe("Self-Reference Prevention", () => {
-      it("should accept tag with no self-reference", () => {
-        const dataWithoutSelfReference = {
-          ...validTagData,
-          id: "tag-main",
-          relatedTags: [
-            {
-              relationType: "category" as const,
-              id: "tag-other",
-              name: "Other Tag",
-            },
-          ],
-        };
-        const result = TagSchema.safeParse(dataWithoutSelfReference);
-        expect(result.success).toBe(true);
-      });
+    describe("Self-Reference Prevention", () => {});
 
-      it("should reject tag that references itself", () => {
-        const dataWithSelfReference = {
-          ...validTagData,
-          id: "tag-self",
-          relatedTags: [
-            {
-              relationType: "category" as const,
-              id: "tag-self", // self-reference
-              name: "Self Tag",
-            },
-          ],
-        };
-        const result = TagSchema.safeParse(dataWithSelfReference);
-        expect(result.success).toBe(false);
-
-        if (!result.success) {
-          const error = result.error as ZodError;
-          const selfRefError = error.issues.find((issue) =>
-            issue.path.includes("relatedTags"),
-          );
-          expect(selfRefError).toBeDefined();
-          expect(selfRefError?.message).toBe(
-            "Tag cannot reference itself in related tags",
-          );
-        }
-      });
-
-      it("should reject multiple self-references", () => {
-        const dataWithMultipleSelfReferences = {
-          ...validTagData,
-          id: "tag-self",
-          relatedTags: [
-            {
-              relationType: "category" as const,
-              id: "tag-self", // self-reference
-              name: "Self Tag 1",
-            },
-            {
-              relationType: "synonym" as const,
-              id: "tag-other",
-              name: "Other Tag",
-            },
-            {
-              relationType: "related" as const,
-              id: "tag-self", // another self-reference
-              name: "Self Tag 2",
-            },
-          ],
-        };
-        const result = TagSchema.safeParse(dataWithMultipleSelfReferences);
-        expect(result.success).toBe(false);
-      });
-
-      it("should handle empty related tags without error", () => {
-        const dataWithEmptyRelatedTags = {
-          ...validTagData,
-          id: "tag-lonely",
-          relatedTags: [],
-        };
-        const result = TagSchema.safeParse(dataWithEmptyRelatedTags);
-        expect(result.success).toBe(true);
-      });
-    });
-
     describe("Combined Validation Errors", () => {
       it("should report both duplicate IDs and self-reference errors", () => {
         const dataWithBothErrors = {
           ...validTagData,
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
