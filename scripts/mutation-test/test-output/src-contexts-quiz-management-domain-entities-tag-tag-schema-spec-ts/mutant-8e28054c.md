# Mutant 8e28054c Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7187
**Stable ID**: 8e28054c
**Location**: L353:10–L353:52

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7187
@@ -349,9 +349,9 @@
       });
     });
 
     describe("Self-Reference Prevention", () => {
-      it("should accept tag with no self-reference", () => {
+      it("", () => {
         const dataWithoutSelfReference = {
           ...validTagData,
           id: "tag-main",
           relatedTags: [
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
