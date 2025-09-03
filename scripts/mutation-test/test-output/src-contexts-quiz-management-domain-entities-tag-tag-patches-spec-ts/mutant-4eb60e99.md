# Mutant 4eb60e99 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6445
**Stable ID**: 4eb60e99
**Location**: L85:48–L259:4

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6445
@@ -81,184 +81,10 @@
       });
     });
   });
 
-  describe("Integrated Patch Suggester", () => {
-    describe("suggestTagPatches", () => {
-      it("should return empty array for non-object input", () => {
-        const issues: Issue[] = [
-          { path: ["relatedTags"], code: "invalid", message: "Invalid" },
-        ];
+  describe("Integrated Patch Suggester", () => {});
 
-        const nonObjectInputs = ["string", 123, true];
-
-        nonObjectInputs.forEach((input) => {
-          const result = suggestTagPatches(input, issues);
-          // Non-object inputs return empty since isObjectLike fails
-          expect(result).toEqual([]);
-        });
-      });
-
-      it("should handle array input", () => {
-        const issues: Issue[] = [
-          { path: ["relatedTags"], code: "invalid", message: "Invalid" },
-        ];
-        const result = suggestTagPatches([], issues);
-        // Array is object-like but doesn't have relatedTags property, so it gets undefined and patches are suggested
-        expect(result).toEqual([{ relatedTags: [] }]);
-      });
-
-      it("should handle null input", () => {
-        const issues: Issue[] = [
-          { path: ["relatedTags"], code: "invalid", message: "Invalid" },
-        ];
-        const result = suggestTagPatches(null, issues);
-        expect(result).toEqual([]);
-      });
-
-      it("should handle undefined input", () => {
-        const issues: Issue[] = [
-          { path: ["relatedTags"], code: "invalid", message: "Invalid" },
-        ];
-        const result = suggestTagPatches(undefined, issues);
-        expect(result).toEqual([]);
-      });
-
-      it("should only suggest patches for fields mentioned in issues", () => {
-        const input = {
-          id: "tag-123",
-          name: "Valid Tag",
-          createdBy: "user-456",
-          createdAt: "2023-12-01T10:00:00.000Z",
-          relatedTags: null,
-        };
-
-        const issues: Issue[] = [
-          {
-            path: ["relatedTags"],
-            code: "invalid",
-            message: "Invalid relatedTags",
-          },
-        ];
-
-        const result = suggestTagPatches(input, issues);
-
-        expect(result).toHaveLength(1);
-        expect(result).toContainEqual({ relatedTags: [] });
-      });
-
-      it("should not suggest patches when field is not in issues", () => {
-        const input = {
-          id: "tag-123",
-          name: "Valid Tag",
-          createdBy: "user-456",
-          createdAt: "2023-12-01T10:00:00.000Z",
-          relatedTags: null, // This would normally trigger a patch
-        };
-
-        const issues: Issue[] = [
-          { path: ["name"], code: "invalid", message: "Invalid name" }, // Different field
-        ];
-
-        const result = suggestTagPatches(input, issues);
-        expect(result).toEqual([]);
-      });
-
-      it("should handle multiple related tag issues", () => {
-        const input = {
-          id: "tag-123",
-          name: "Valid Tag",
-          createdBy: "user-456",
-          createdAt: "2023-12-01T10:00:00.000Z",
-          relatedTags: undefined,
-        };
-
-        const issues: Issue[] = [
-          {
-            path: ["relatedTags"],
-            code: "invalid",
-            message: "Invalid relatedTags",
-          },
-          {
-            path: ["relatedTags", 0],
-            code: "invalid",
-            message: "Invalid related tag",
-          },
-        ];
-
-        const result = suggestTagPatches(input, issues);
-
-        expect(result).toHaveLength(1);
-        expect(result).toContainEqual({ relatedTags: [] });
-      });
-
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
-    });
-  });
-
   describe("Edge Cases and Error Handling", () => {
     it("should handle empty issues array", () => {
       const result = suggestTagPatches(validTagInput, []);
       expect(result).toEqual([]);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
