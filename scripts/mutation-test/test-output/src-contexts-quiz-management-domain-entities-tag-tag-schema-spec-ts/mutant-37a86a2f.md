# Mutant 37a86a2f Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 7097
**Stable ID**: 37a86a2f
**Location**: L228:26–L234:14

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7097
@@ -224,15 +224,9 @@
           ["related", "related"],
         ])("should accept valid relationType: %s", (_desc, relationType) => {
           const dataWithRelationType = {
             ...validTagData,
-            relatedTags: [
-              {
-                relationType,
-                id: "tag-test",
-                name: "Test Tag",
-              },
-            ],
+            relatedTags: [],
           };
           const result = TagSchema.safeParse(dataWithRelationType);
           expect(result.success).toBe(true);
         });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
