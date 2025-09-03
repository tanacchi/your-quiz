# Mutant 7fb45bf1 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6541
**Stable ID**: 7fb45bf1
**Location**: L194:61–L257:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6541
@@ -190,72 +190,9 @@
         expect(result).toHaveLength(1);
         expect(result).toContainEqual({ relatedTags: [] });
       });
 
-      describe("Integration with applyEntityPatches", () => {
-        it("should apply relatedTags patch correctly", () => {
-          const input = {
-            id: "tag-123",
-            name: "TypeScript",
-            createdBy: "user-456",
-            createdAt: "2023-12-01T10:00:00.000Z",
-            relatedTags: null,
-          };
-
-          const issues: Issue[] = [
-            {
-              path: ["relatedTags"],
-              code: "invalid",
-              message: "Invalid relatedTags",
-            },
-          ];
-
-          const patches = suggestTagPatches(input, issues);
-          const patched: TagInput = applyEntityPatches<TagInput>(
-            input,
-            patches,
-          ) as TagInput;
-
-          expect(patched.relatedTags).toEqual([]);
-          expect(patched.id).toBe(input.id);
-          expect(patched.name).toBe(input.name);
-          expect(patched.createdBy).toBe(input.createdBy);
-          expect(patched.createdAt).toBe(input.createdAt);
-        });
-
-        it("should preserve other fields when applying patches", () => {
-          const input = {
-            id: "tag-typescript",
-            name: "TypeScript Programming",
-            createdBy: "user-expert",
-            createdAt: "2023-12-01T10:00:00.000Z",
-            relatedTags: undefined,
-            extraData: "should be preserved", // This would be removed by strict schema, but patch doesn't affect it
-          };
-
-          const issues: Issue[] = [
-            {
-              path: ["relatedTags"],
-              code: "required",
-              message: "RelatedTags is required",
-            },
-          ];
-
-          const patches = suggestTagPatches(input, issues);
-          const patched: TagInput = applyEntityPatches<TagInput>(
-            input,
-            patches,
-          ) as TagInput;
-
-          expect(patched.relatedTags).toEqual([]);
-          expect(patched.id).toBe(input.id);
-          expect(patched.name).toBe(input.name);
-          expect(patched.createdBy).toBe(input.createdBy);
-          expect(patched.createdAt).toBe(input.createdAt);
-          // biome-ignore lint/suspicious/noExplicitAny: 存在しないはずのフィールドのテスト用
-          expect((patched as any).extraData).toBe(input.extraData);
-        });
-      });
+      describe("Integration with applyEntityPatches", () => {});
     });
   });
 
   describe("Edge Cases and Error Handling", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
