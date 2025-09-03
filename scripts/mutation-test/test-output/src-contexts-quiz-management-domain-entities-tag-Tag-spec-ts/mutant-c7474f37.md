# Mutant c7474f37 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6185
**Stable ID**: c7474f37
**Location**: L84:26–L90:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6185
@@ -80,15 +80,9 @@
 
       const result = Tag.from(tagWithRelations);
       expect(result.isOk()).toBe(true);
 
-      if (result.isOk()) {
-        const tag = result.value;
-        const relations = tag.get("relatedTags");
-        expect(relations).toHaveLength(1);
-        expect(relations[0]?.relationType).toBe("hierarchy");
-        expect(relations[0]?.name).toBe("Programming");
-      }
+      if (result.isOk()) {}
     });
 
     it("should suggest patches for invalid data", () => {
       const invalidData = {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
