# Mutant 6037df56 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6947
**Stable ID**: 6037df56
**Location**: L107:34–L124:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6947
@@ -103,26 +103,9 @@
         expect(result.success).toBe(false);
       });
     });
 
-    describe("Name Field", () => {
-      it.each([
-        ["valid name", "TypeScript", true],
-        ["single character", "T", true],
-        ["unicode characters", "プログラミング", true],
-        ["with spaces", "Programming Language", true],
-        ["with special chars", "C++", true],
-        ["exactly 50 chars", "A".repeat(50), true],
-        ["empty string", "", false],
-        ["only whitespace", "   ", true],
-        ["51 chars", "A".repeat(51), false],
-        ["null value", null, false],
-      ])("should validate name: %s -> %s", (_desc, name, isValid) => {
-        const data = { ...validTagData, name };
-        const result = TagSchema.safeParse(data);
-        expect(result.success).toBe(isValid);
-      });
-    });
+    describe("Name Field", () => {});
 
     describe("RelatedTags Field", () => {
       it("should accept empty related tags array", () => {
         const dataWithEmptyRelatedTags = {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
