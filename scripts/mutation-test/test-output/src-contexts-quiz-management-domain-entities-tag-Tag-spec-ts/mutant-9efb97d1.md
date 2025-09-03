# Mutant 9efb97d1 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6082
**Stable ID**: 9efb97d1
**Location**: L13:33–L54:4

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6082
@@ -9,51 +9,10 @@
     createdAt: "2023-12-01 10:00:00",
     relatedTags: [],
   } as const;
 
-  describe("Brand Types", () => {
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
+  describe("Brand Types", () => {});
 
-    describe("UserId validation", () => {
-      it.each([
-        ["valid alphanumeric", "user-1", true],
-        ["valid with numbers", "user123", true],
-        ["empty string", "", false],
-        ["null value", null, false],
-        ["undefined value", undefined, false],
-      ])("should handle %s: %s", (_desc, input, isValid) => {
-        const result = UserId.safeParse(input);
-        expect(result.success).toBe(isValid);
-      });
-    });
-
-    describe("RelationType validation", () => {
-      it.each([
-        ["hierarchy", "hierarchy", true],
-        ["category", "category", true],
-        ["synonym", "synonym", true],
-        ["related", "related", true],
-        ["invalid type", "invalid", false],
-        ["empty string", "", false],
-        ["null value", null, false],
-      ])("should handle %s: %s", (_desc, input, isValid) => {
-        const result = RelationType.safeParse(input);
-        expect(result.success).toBe(isValid);
-      });
-    });
-  });
-
   describe("Entity Creation", () => {
     it("should create valid tag from complete data", () => {
       const result = Tag.from(validTagData);
       expect(result.isOk()).toBe(true);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
