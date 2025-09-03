# Mutant 769ade63 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 6167
**Stable ID**: 769ade63
**Location**: L61:11–L61:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6167
@@ -57,9 +57,9 @@
     it("should create valid tag from complete data", () => {
       const result = Tag.from(validTagData);
       expect(result.isOk()).toBe(true);
 
-      if (result.isOk()) {
+      if (false) {
         const tag = result.value;
         expect(tag.get("name")).toBe("JavaScript");
         expect(tag.get("createdBy")).toBe("user-1");
         expect(tag.get("relatedTags")).toEqual([]);
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
