# Mutant dfdc9c72 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6920
**Stable ID**: dfdc9c72
**Location**: L80:12–L80:34

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6920
@@ -76,9 +76,9 @@
       });
     });
   });
 
-  describe("TagSchema Validation", () => {
+  describe("", () => {
     describe("Required Fields", () => {
       it("should accept valid complete tag data", () => {
         const result = TagSchema.safeParse(validTagData);
         expect(result.success).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
