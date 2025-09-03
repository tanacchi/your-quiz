# Mutant 6cc9249b Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6236
**Stable ID**: 6cc9249b
**Location**: L166:8–L166:39

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6236
@@ -162,9 +162,9 @@
         ).toBe(true);
       }
     });
 
-    it("should prevent self-reference", () => {
+    it("", () => {
       const selfReferencingData = {
         ...validTagData,
         relatedTags: [
           {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
