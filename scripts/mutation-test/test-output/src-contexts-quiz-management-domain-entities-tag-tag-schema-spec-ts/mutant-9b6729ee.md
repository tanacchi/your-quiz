# Mutant 9b6729ee Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 7224
**Stable ID**: 9b6729ee
**Location**: L411:13–L415:14

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7224
@@ -407,13 +407,9 @@
               relationType: "synonym" as const,
               id: "tag-other",
               name: "Other Tag",
             },
-            {
-              relationType: "related" as const,
-              id: "tag-self", // another self-reference
-              name: "Self Tag 2",
-            },
+            {},
           ],
         };
         const result = TagSchema.safeParse(dataWithMultipleSelfReferences);
         expect(result.success).toBe(false);
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
