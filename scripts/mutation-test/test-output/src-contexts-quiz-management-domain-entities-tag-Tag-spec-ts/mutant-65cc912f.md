# Mutant 65cc912f Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6263
**Stable ID**: 65cc912f
**Location**: L217:8–L217:41

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6263
@@ -213,9 +213,9 @@
       expect(result.isOk()).toBe(true);
       tag = result._unsafeUnwrap();
     });
 
-    it("should get related tags by type", () => {
+    it("", () => {
       const hierarchyTags = tag.getRelatedTagsByType("hierarchy");
       expect(hierarchyTags).toHaveLength(1);
       expect(hierarchyTags[0]?.name).toBe("Programming");
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
