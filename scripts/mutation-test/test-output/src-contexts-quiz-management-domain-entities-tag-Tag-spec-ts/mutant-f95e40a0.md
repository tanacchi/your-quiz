# Mutant f95e40a0 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6287
**Stable ID**: f95e40a0
**Location**: L239:12–L239:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6287
@@ -235,9 +235,9 @@
       expect(tag.hasRelationWith(TagId.parse("tag-999"))).toBe(false);
     });
   });
 
-  describe("Draft Usage", () => {
+  describe("", () => {
     it("should work with Draft pattern", () => {
       const draft = new Tag.Draft();
       draft.update("name", "TypeScript");
       draft.with({
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
