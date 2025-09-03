# Mutant b8b347a0 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 6371
**Stable ID**: b8b347a0
**Location**: L17:7–L21:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6371
@@ -13,13 +13,9 @@
     name: "TypeScript",
     createdBy: "user-456",
     createdAt: "2023-12-01T10:00:00.000Z",
     relatedTags: [
-      {
-        relationType: "category",
-        id: "tag-789",
-        name: "Programming Languages",
-      },
+      {},
     ],
   };
 
   describe("Individual Patch Suggesters", () => {
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
