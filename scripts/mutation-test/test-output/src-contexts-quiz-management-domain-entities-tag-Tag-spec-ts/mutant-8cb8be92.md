# Mutant 8cb8be92 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6197
**Stable ID**: 8cb8be92
**Location**: L102:26–L105:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6197
@@ -98,12 +98,9 @@
 
       const result = Tag.from(invalidData);
       expect(result.isOk()).toBe(true); // null transforms to []
 
-      if (result.isOk()) {
-        const tag = result.value;
-        expect(tag.get("relatedTags")).toEqual([]);
-      }
+      if (result.isOk()) {}
     });
 
     it("should reject invalid name length", () => {
       const invalidData = {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
