# Mutant d123da8e Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 7191
**Stable ID**: d123da8e
**Location**: L357:24–L363:12

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7191
@@ -353,15 +353,9 @@
       it("should accept tag with no self-reference", () => {
         const dataWithoutSelfReference = {
           ...validTagData,
           id: "tag-main",
-          relatedTags: [
-            {
-              relationType: "category" as const,
-              id: "tag-other",
-              name: "Other Tag",
-            },
-          ],
+          relatedTags: [],
         };
         const result = TagSchema.safeParse(dataWithoutSelfReference);
         expect(result.success).toBe(true);
       });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
