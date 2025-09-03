# Mutant 3dae4f49 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6216
**Stable ID**: 3dae4f49
**Location**: L135:12–L135:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6216
@@ -131,9 +131,9 @@
       expect(result.isErr()).toBe(true);
     });
   });
 
-  describe("Validation Rules", () => {
+  describe("", () => {
     it("should prevent duplicate related tag IDs", () => {
       const invalidData = {
         ...validTagData,
         relatedTags: [
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
