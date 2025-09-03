# Mutant cb7b5b44 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6218
**Stable ID**: cb7b5b44
**Location**: L136:8–L136:50

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6218
@@ -132,9 +132,9 @@
     });
   });
 
   describe("Validation Rules", () => {
-    it("should prevent duplicate related tag IDs", () => {
+    it("", () => {
       const invalidData = {
         ...validTagData,
         relatedTags: [
           {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
