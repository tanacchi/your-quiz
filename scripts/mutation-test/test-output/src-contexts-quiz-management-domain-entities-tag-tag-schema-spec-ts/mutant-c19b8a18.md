# Mutant c19b8a18 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7136
**Stable ID**: c19b8a18
**Location**: L269:14–L269:41

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7136
@@ -265,9 +265,9 @@
     });
   });
 
   describe("Cross-Field Validation (superRefine)", () => {
-    describe("Duplicate Related Tag IDs", () => {
+    describe("", () => {
       it("should accept unique related tag IDs", () => {
         const dataWithUniqueRelatedTagIds = {
           ...validTagData,
           relatedTags: [
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
