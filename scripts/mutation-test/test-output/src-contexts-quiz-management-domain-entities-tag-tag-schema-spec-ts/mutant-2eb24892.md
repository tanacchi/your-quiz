# Mutant 2eb24892 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7095
**Stable ID**: 2eb24892
**Location**: L225:77–L238:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7095
@@ -221,22 +221,9 @@
           ["hierarchy", "hierarchy"],
           ["category", "category"],
           ["synonym", "synonym"],
           ["related", "related"],
-        ])("should accept valid relationType: %s", (_desc, relationType) => {
-          const dataWithRelationType = {
-            ...validTagData,
-            relatedTags: [
-              {
-                relationType,
-                id: "tag-test",
-                name: "Test Tag",
-              },
-            ],
-          };
-          const result = TagSchema.safeParse(dataWithRelationType);
-          expect(result.success).toBe(true);
-        });
+        ])("should accept valid relationType: %s", (_desc, relationType) => {});
       });
     });
 
     describe("Date Validation", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
