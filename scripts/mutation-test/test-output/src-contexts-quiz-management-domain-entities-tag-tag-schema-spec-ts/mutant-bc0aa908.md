# Mutant bc0aa908 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7071
**Stable ID**: bc0aa908
**Location**: L205:13–L205:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7071
@@ -201,9 +201,9 @@
           ],
           ["empty id", { relationType: "category", id: "", name: "Test" }],
           ["empty name", { relationType: "category", id: "tag-1", name: "" }],
           [
-            "51 char name",
+            "",
             { relationType: "category", id: "tag-1", name: "A".repeat(51) },
           ],
         ])(
           "should reject invalid related tag: %s",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
