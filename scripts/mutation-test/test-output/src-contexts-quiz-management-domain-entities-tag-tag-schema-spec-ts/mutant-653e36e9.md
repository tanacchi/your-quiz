# Mutant 653e36e9 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7213
**Stable ID**: 653e36e9
**Location**: L396:10–L396:50

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7213
@@ -392,9 +392,9 @@
           );
         }
       });
 
-      it("should reject multiple self-references", () => {
+      it("", () => {
         const dataWithMultipleSelfReferences = {
           ...validTagData,
           id: "tag-self",
           relatedTags: [
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
