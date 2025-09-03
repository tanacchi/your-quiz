# Mutant 6081ff6d Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7138
**Stable ID**: 6081ff6d
**Location**: L270:10–L270:48

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7138
@@ -266,9 +266,9 @@
   });
 
   describe("Cross-Field Validation (superRefine)", () => {
     describe("Duplicate Related Tag IDs", () => {
-      it("should accept unique related tag IDs", () => {
+      it("", () => {
         const dataWithUniqueRelatedTagIds = {
           ...validTagData,
           relatedTags: [
             {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
