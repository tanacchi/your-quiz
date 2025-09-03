# Mutant 25b3fa3c Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7369
**Stable ID**: 25b3fa3c
**Location**: L599:8–L599:63

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7369
@@ -595,9 +595,9 @@
         expect(result.data.relatedTags).toEqual([]);
       }
     });
 
-    it("should handle tag with unicode and special characters", () => {
+    it("", () => {
       const unicodeTag = {
         id: "tag-unicode-special",
         name: "C++ & プログラミング 🚀",
         createdBy: "user-international",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
