# Mutant 0ec81786 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6084
**Stable ID**: 0ec81786
**Location**: L14:40–L25:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6084
@@ -10,20 +10,9 @@
     relatedTags: [],
   } as const;
 
   describe("Brand Types", () => {
-    describe("TagId validation", () => {
-      it.each([
-        ["valid alphanumeric", "tag-1", true],
-        ["valid with numbers", "tag123", true],
-        ["empty string", "", false],
-        ["null value", null, false],
-        ["undefined value", undefined, false],
-      ])("should handle %s: %s", (_desc, input, isValid) => {
-        const result = TagId.safeParse(input);
-        expect(result.success).toBe(isValid);
-      });
-    });
+    describe("TagId validation", () => {});
 
     describe("UserId validation", () => {
       it.each([
         ["valid alphanumeric", "user-1", true],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
