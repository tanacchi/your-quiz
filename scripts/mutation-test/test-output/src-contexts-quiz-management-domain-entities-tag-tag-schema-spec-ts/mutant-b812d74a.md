# Mutant b812d74a Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7262
**Stable ID**: b812d74a
**Location**: L478:52–L536:4

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7262
@@ -474,68 +474,10 @@
       });
     });
   });
 
-  describe("Edge Cases and Boundary Values", () => {
-    describe("Name Length Boundaries", () => {
-      it("should accept exactly 1 character name", () => {
-        const data = { ...validTagData, name: "A" };
-        const result = TagSchema.safeParse(data);
-        expect(result.success).toBe(true);
-      });
+  describe("Edge Cases and Boundary Values", () => {});
 
-      it("should accept exactly 50 character name", () => {
-        const data = { ...validTagData, name: "A".repeat(50) };
-        const result = TagSchema.safeParse(data);
-        expect(result.success).toBe(true);
-      });
-
-      it("should reject 51 character name", () => {
-        const data = { ...validTagData, name: "A".repeat(51) };
-        const result = TagSchema.safeParse(data);
-        expect(result.success).toBe(false);
-      });
-    });
-
-    describe("Special Characters in Names", () => {
-      it.each([
-        ["special characters", "C++"],
-        ["emoji", "TypeScript 🚀"],
-        ["unicode", "プログラミング言語"],
-        ["spaces", "Programming Language"],
-        ["numbers", "TypeScript 4.9"],
-        ["hyphens", "Front-End"],
-        ["underscores", "Snake_Case"],
-        ["dots", "Node.js"],
-      ])("should accept name with %s", (_desc, name) => {
-        const data = { ...validTagData, name };
-        const result = TagSchema.safeParse(data);
-        expect(result.success).toBe(true);
-      });
-    });
-
-    describe("Large Related Tags Arrays", () => {
-      it("should handle many related tags", () => {
-        const manyRelatedTags = Array.from({ length: 20 }, (_, i) => ({
-          relationType: "related" as const,
-          id: `tag-${i}`,
-          name: `Related Tag ${i}`,
-        }));
-
-        const data = {
-          ...validTagData,
-          relatedTags: manyRelatedTags,
-        };
-        const result = TagSchema.safeParse(data);
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.relatedTags).toHaveLength(20);
-        }
-      });
-    });
-  });
-
   describe("Integration Scenarios", () => {
     it("should handle tag with hierarchical relationships", () => {
       const hierarchicalTag = {
         id: "tag-typescript",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
