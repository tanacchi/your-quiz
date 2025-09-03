# Mutant f18ce61a Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6289
**Stable ID**: f18ce61a
**Location**: L240:8–L240:40

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6289
@@ -236,9 +236,9 @@
     });
   });
 
   describe("Draft Usage", () => {
-    it("should work with Draft pattern", () => {
+    it("", () => {
       const draft = new Tag.Draft();
       draft.update("name", "TypeScript");
       draft.with({
         id: TagId.parse("tag-typescript"),
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
