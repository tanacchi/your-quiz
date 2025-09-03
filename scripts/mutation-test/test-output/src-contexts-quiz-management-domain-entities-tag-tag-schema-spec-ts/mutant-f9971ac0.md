# Mutant f9971ac0 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7076
**Stable ID**: f9971ac0
**Location**: L209:11–L209:50

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7076
@@ -205,9 +205,9 @@
             "51 char name",
             { relationType: "category", id: "tag-1", name: "A".repeat(51) },
           ],
         ])(
-          "should reject invalid related tag: %s",
+          "",
           (_desc, invalidRelatedTag) => {
             const dataWithInvalidRelatedTag = {
               ...validTagData,
               relatedTags: [invalidRelatedTag],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
