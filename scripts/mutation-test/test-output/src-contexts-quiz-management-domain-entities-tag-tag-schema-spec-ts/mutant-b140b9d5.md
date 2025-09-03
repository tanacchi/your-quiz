# Mutant b140b9d5 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6817
**Stable ID**: b140b9d5
**Location**: L28:29–L48:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6817
@@ -24,30 +24,10 @@
     ],
   };
 
   describe("Brand Types", () => {
-    describe("TagId", () => {
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
-        const result = TagId.safeParse(input);
-        expect(result.success).toBe(isValid);
+    describe("TagId", () => {});
 
-        if (isValid && result.success) {
-          expect(result.data).toBe(input);
-        }
-      });
-    });
-
     describe("UserId", () => {
       it.each([
         ["valid format", "user-123", true],
         ["valid uuid", "550e8400-e29b-41d4-a716-446655440000", true],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
