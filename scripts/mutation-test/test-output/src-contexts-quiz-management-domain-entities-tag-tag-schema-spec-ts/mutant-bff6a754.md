# Mutant bff6a754 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7089
**Stable ID**: bff6a754
**Location**: L223:12–L223:21

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7089
@@ -219,9 +219,9 @@
 
         it.each([
           ["hierarchy", "hierarchy"],
           ["category", "category"],
-          ["synonym", "synonym"],
+          ["", "synonym"],
           ["related", "related"],
         ])("should accept valid relationType: %s", (_desc, relationType) => {
           const dataWithRelationType = {
             ...validTagData,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
