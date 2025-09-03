# Mutant 25373f1b Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7171
**Stable ID**: 25373f1b
**Location**: L326:10–L326:45

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7171
@@ -322,9 +322,9 @@
           );
         }
       });
 
-      it("should handle multiple duplicates", () => {
+      it("", () => {
         const dataWithMultipleDuplicates = {
           ...validTagData,
           relatedTags: [
             {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
