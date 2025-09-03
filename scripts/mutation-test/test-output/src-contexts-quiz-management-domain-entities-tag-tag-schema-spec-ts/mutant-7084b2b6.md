# Mutant 7084b2b6 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7370
**Stable ID**: 7084b2b6
**Location**: L599:71–L622:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7370
@@ -595,30 +595,7 @@
         expect(result.data.relatedTags).toEqual([]);
       }
     });
 
-    it("should handle tag with unicode and special characters", () => {
-      const unicodeTag = {
-        id: "tag-unicode-special",
-        name: "C++ & プログラミング 🚀",
-        createdBy: "user-international",
-        createdAt: "2023-12-01 10:00:00",
-        relatedTags: [
-          {
-            relationType: "category" as const,
-            id: "tag-languages",
-            name: "Programming Languages & 言語",
-          },
-        ],
-      };
-
-      const result = TagSchema.safeParse(unicodeTag);
-      expect(result.success).toBe(true);
-
-      if (result.success) {
-        expect(result.data.name).toContain("C++");
-        expect(result.data.name).toContain("プログラミング");
-        expect(result.data.name).toContain("🚀");
-      }
-    });
+    it("should handle tag with unicode and special characters", () => {});
   });
 });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
