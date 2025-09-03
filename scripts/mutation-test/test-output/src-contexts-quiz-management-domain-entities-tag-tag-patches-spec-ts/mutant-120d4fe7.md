# Mutant 120d4fe7 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 6370
**Stable ID**: 120d4fe7
**Location**: L16:18–L22:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6370
@@ -12,15 +12,9 @@
     id: "tag-123",
     name: "TypeScript",
     createdBy: "user-456",
     createdAt: "2023-12-01T10:00:00.000Z",
-    relatedTags: [
-      {
-        relationType: "category",
-        id: "tag-789",
-        name: "Programming Languages",
-      },
-    ],
+    relatedTags: [],
   };
 
   describe("Individual Patch Suggesters", () => {
     describe("suggestRelatedTagsPatches", () => {
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
