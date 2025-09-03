# Mutant 8bf6b127 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7358
**Stable ID**: 8bf6b127
**Location**: L583:64–L597:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7358
@@ -579,24 +579,10 @@
         ]);
       }
     });
 
-    it("should handle minimal tag without related tags", () => {
-      const minimalTag = {
-        id: "t",
-        name: "T",
-        createdBy: "u",
-        createdAt: "2023-12-01 10:00:00",
-      };
+    it("should handle minimal tag without related tags", () => {});
 
-      const result = TagSchema.safeParse(minimalTag);
-      expect(result.success).toBe(true);
-
-      if (result.success) {
-        expect(result.data.relatedTags).toEqual([]);
-      }
-    });
-
     it("should handle tag with unicode and special characters", () => {
       const unicodeTag = {
         id: "tag-unicode-special",
         name: "C++ & プログラミング 🚀",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
