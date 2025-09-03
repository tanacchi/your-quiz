# Mutant 623b79f5 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7075
**Stable ID**: 623b79f5
**Location**: L206:60–L206:63

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7075
@@ -202,9 +202,9 @@
           ["empty id", { relationType: "category", id: "", name: "Test" }],
           ["empty name", { relationType: "category", id: "tag-1", name: "" }],
           [
             "51 char name",
-            { relationType: "category", id: "tag-1", name: "A".repeat(51) },
+            { relationType: "category", id: "tag-1", name: "".repeat(51) },
           ],
         ])(
           "should reject invalid related tag: %s",
           (_desc, invalidRelatedTag) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
