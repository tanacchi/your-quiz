# Mutant 6ab14fee Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7083
**Stable ID**: 6ab14fee
**Location**: L221:12–L221:23

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7083
@@ -217,9 +217,9 @@
           },
         );
 
         it.each([
-          ["hierarchy", "hierarchy"],
+          ["", "hierarchy"],
           ["category", "category"],
           ["synonym", "synonym"],
           ["related", "related"],
         ])("should accept valid relationType: %s", (_desc, relationType) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
