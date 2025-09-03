# Mutant 147eba50 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 6809
**Stable ID**: 147eba50
**Location**: L18:18–L24:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6809
@@ -14,15 +14,9 @@
     id: "tag-123",
     name: "TypeScript",
     createdBy: "user-456",
     createdAt: "2023-12-01 10:00:00",
-    relatedTags: [
-      {
-        relationType: "category",
-        id: "tag-789",
-        name: "Programming Languages",
-      },
-    ],
+    relatedTags: [],
   };
 
   describe("Brand Types", () => {
     describe("TagId", () => {
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
