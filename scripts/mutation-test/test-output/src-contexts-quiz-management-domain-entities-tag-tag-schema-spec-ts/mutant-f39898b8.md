# Mutant f39898b8 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 6818
**Stable ID**: f39898b8
**Location**: L29:15–L40:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6818
@@ -25,20 +25,9 @@
   };
 
   describe("Brand Types", () => {
     describe("TagId", () => {
-      it.each([
-        ["valid alphanumeric", "tag-123", true],
-        ["valid with underscore", "tag_test", true],
-        ["valid uuid format", "550e8400-e29b-41d4-a716-446655440000", true],
-        ["valid single char", "t", true],
-        ["empty string", "", false],
-        ["only whitespace", "   ", true],
-        ["null value", null, false],
-        ["undefined value", undefined, false],
-        ["number", 123, false],
-        ["object", {}, false],
-      ])("should validate %s: %s -> %s", (_desc, input, isValid) => {
+      it.each([])("should validate %s: %s -> %s", (_desc, input, isValid) => {
         const result = TagId.safeParse(input);
         expect(result.success).toBe(isValid);
 
         if (isValid && result.success) {
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
