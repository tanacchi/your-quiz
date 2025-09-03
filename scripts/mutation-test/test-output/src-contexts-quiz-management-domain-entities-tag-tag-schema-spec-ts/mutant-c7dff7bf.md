# Mutant c7dff7bf Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7216
**Stable ID**: c7dff7bf
**Location**: L399:15–L399:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7216
@@ -395,9 +395,9 @@
 
       it("should reject multiple self-references", () => {
         const dataWithMultipleSelfReferences = {
           ...validTagData,
-          id: "tag-self",
+          id: "",
           relatedTags: [
             {
               relationType: "category" as const,
               id: "tag-self", // self-reference
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
