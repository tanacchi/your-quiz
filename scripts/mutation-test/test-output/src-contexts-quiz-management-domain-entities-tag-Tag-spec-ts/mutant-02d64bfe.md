# Mutant 02d64bfe Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 6085
**Stable ID**: 02d64bfe
**Location**: L15:15–L21:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6085
@@ -11,15 +11,9 @@
   } as const;
 
   describe("Brand Types", () => {
     describe("TagId validation", () => {
-      it.each([
-        ["valid alphanumeric", "tag-1", true],
-        ["valid with numbers", "tag123", true],
-        ["empty string", "", false],
-        ["null value", null, false],
-        ["undefined value", undefined, false],
-      ])("should handle %s: %s", (_desc, input, isValid) => {
+      it.each([])("should handle %s: %s", (_desc, input, isValid) => {
         const result = TagId.safeParse(input);
         expect(result.success).toBe(isValid);
       });
     });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
