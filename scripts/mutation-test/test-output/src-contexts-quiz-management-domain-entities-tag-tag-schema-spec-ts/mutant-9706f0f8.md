# Mutant 9706f0f8 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7092
**Stable ID**: 9706f0f8
**Location**: L224:12–L224:21

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7092
@@ -220,9 +220,9 @@
         it.each([
           ["hierarchy", "hierarchy"],
           ["category", "category"],
           ["synonym", "synonym"],
-          ["related", "related"],
+          ["", "related"],
         ])("should accept valid relationType: %s", (_desc, relationType) => {
           const dataWithRelationType = {
             ...validTagData,
             relatedTags: [
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
