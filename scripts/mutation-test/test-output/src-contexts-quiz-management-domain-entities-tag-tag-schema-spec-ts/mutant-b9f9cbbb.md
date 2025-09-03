# Mutant b9f9cbbb Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7086
**Stable ID**: b9f9cbbb
**Location**: L222:12–L222:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7086
@@ -218,9 +218,9 @@
         );
 
         it.each([
           ["hierarchy", "hierarchy"],
-          ["category", "category"],
+          ["", "category"],
           ["synonym", "synonym"],
           ["related", "related"],
         ])("should accept valid relationType: %s", (_desc, relationType) => {
           const dataWithRelationType = {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
