# Mutant f283c23c Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 7218
**Stable ID**: f283c23c
**Location**: L401:13–L405:14

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7218
@@ -397,14 +397,10 @@
         const dataWithMultipleSelfReferences = {
           ...validTagData,
           id: "tag-self",
           relatedTags: [
+            {},
             {
-              relationType: "category" as const,
-              id: "tag-self", // self-reference
-              name: "Self Tag 1",
-            },
-            {
               relationType: "synonym" as const,
               id: "tag-other",
               name: "Other Tag",
             },
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
