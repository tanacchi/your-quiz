# Mutant ab20aac8 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7035
**Stable ID**: ab20aac8
**Location**: L193:55–L239:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7035
@@ -189,55 +189,9 @@
           expect(result.data.relatedTags).toHaveLength(3);
         }
       });
 
-      describe("Related Tag Object Validation", () => {
-        it.each([
-          ["missing relationType", { id: "tag-1", name: "Test" }],
-          ["missing id", { relationType: "category", name: "Test" }],
-          ["missing name", { relationType: "category", id: "tag-1" }],
-          [
-            "invalid relationType",
-            { relationType: "invalid", id: "tag-1", name: "Test" },
-          ],
-          ["empty id", { relationType: "category", id: "", name: "Test" }],
-          ["empty name", { relationType: "category", id: "tag-1", name: "" }],
-          [
-            "51 char name",
-            { relationType: "category", id: "tag-1", name: "A".repeat(51) },
-          ],
-        ])(
-          "should reject invalid related tag: %s",
-          (_desc, invalidRelatedTag) => {
-            const dataWithInvalidRelatedTag = {
-              ...validTagData,
-              relatedTags: [invalidRelatedTag],
-            };
-            const result = TagSchema.safeParse(dataWithInvalidRelatedTag);
-            expect(result.success).toBe(false);
-          },
-        );
-
-        it.each([
-          ["hierarchy", "hierarchy"],
-          ["category", "category"],
-          ["synonym", "synonym"],
-          ["related", "related"],
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
-      });
+      describe("Related Tag Object Validation", () => {});
     });
 
     describe("Date Validation", () => {
       it.each([
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
