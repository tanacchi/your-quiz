# Mutant fcb9f2df Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7197
**Stable ID**: fcb9f2df
**Location**: L369:60–L394:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7197
@@ -365,35 +365,10 @@
         const result = TagSchema.safeParse(dataWithoutSelfReference);
         expect(result.success).toBe(true);
       });
 
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
+      it("should reject tag that references itself", () => {});
 
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
       it("should reject multiple self-references", () => {
         const dataWithMultipleSelfReferences = {
           ...validTagData,
           id: "tag-self",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
