# Mutant 30883be2 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6373
**Stable ID**: 30883be2
**Location**: L19:13–L19:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6373
@@ -15,9 +15,9 @@
     createdAt: "2023-12-01T10:00:00.000Z",
     relatedTags: [
       {
         relationType: "category",
-        id: "tag-789",
+        id: "",
         name: "Programming Languages",
       },
     ],
   };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
