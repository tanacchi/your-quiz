# Mutant 85d3b529 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 6166
**Stable ID**: 85d3b529
**Location**: L61:11–L61:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6166
@@ -57,9 +57,9 @@
     it("should create valid tag from complete data", () => {
       const result = Tag.from(validTagData);
       expect(result.isOk()).toBe(true);
 
-      if (result.isOk()) {
+      if (true) {
         const tag = result.value;
         expect(tag.get("name")).toBe("JavaScript");
         expect(tag.get("createdBy")).toBe("user-1");
         expect(tag.get("relatedTags")).toEqual([]);
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
