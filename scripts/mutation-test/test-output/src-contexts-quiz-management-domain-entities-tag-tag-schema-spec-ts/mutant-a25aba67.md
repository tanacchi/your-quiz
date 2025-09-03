# Mutant a25aba67 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7094
**Stable ID**: a25aba67
**Location**: L225:12–L225:50

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7094
@@ -221,9 +221,9 @@
           ["hierarchy", "hierarchy"],
           ["category", "category"],
           ["synonym", "synonym"],
           ["related", "related"],
-        ])("should accept valid relationType: %s", (_desc, relationType) => {
+        ])("", (_desc, relationType) => {
           const dataWithRelationType = {
             ...validTagData,
             relatedTags: [
               {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
