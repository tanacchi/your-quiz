# Mutant 0aefd2f8 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7002
**Stable ID**: 0aefd2f8
**Location**: L140:10–L140:71

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7002
@@ -136,9 +136,9 @@
           expect(result.data.relatedTags).toEqual([]);
         }
       });
 
-      it("should accept null relatedTags and transform to empty array", () => {
+      it("", () => {
         const dataWithNullRelatedTags = {
           ...validTagData,
           relatedTags: null,
         };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
