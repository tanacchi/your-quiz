# Mutant 5cd9a446 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 7376
**Stable ID**: 5cd9a446
**Location**: L605:22–L611:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7376
@@ -601,15 +601,9 @@
         id: "tag-unicode-special",
         name: "C++ & プログラミング 🚀",
         createdBy: "user-international",
         createdAt: "2023-12-01 10:00:00",
-        relatedTags: [
-          {
-            relationType: "category" as const,
-            id: "tag-languages",
-            name: "Programming Languages & 言語",
-          },
-        ],
+        relatedTags: [],
       };
 
       const result = TagSchema.safeParse(unicodeTag);
       expect(result.success).toBe(true);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
