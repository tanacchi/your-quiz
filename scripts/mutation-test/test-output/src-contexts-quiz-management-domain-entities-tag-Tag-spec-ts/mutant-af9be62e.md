# Mutant af9be62e Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6191
**Stable ID**: af9be62e
**Location**: L93:8–L93:49

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6191
@@ -89,9 +89,9 @@
         expect(relations[0]?.name).toBe("Programming");
       }
     });
 
-    it("should suggest patches for invalid data", () => {
+    it("", () => {
       const invalidData = {
         ...validTagData,
         relatedTags: null,
       };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
