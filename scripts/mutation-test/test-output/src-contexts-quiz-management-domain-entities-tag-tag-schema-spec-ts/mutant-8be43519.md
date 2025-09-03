# Mutant 8be43519 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 7081
**Stable ID**: 8be43519
**Location**: L220:17–L225:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7081
@@ -216,14 +216,9 @@
             expect(result.success).toBe(false);
           },
         );
 
-        it.each([
-          ["hierarchy", "hierarchy"],
-          ["category", "category"],
-          ["synonym", "synonym"],
-          ["related", "related"],
-        ])("should accept valid relationType: %s", (_desc, relationType) => {
+        it.each([])("should accept valid relationType: %s", (_desc, relationType) => {
           const dataWithRelationType = {
             ...validTagData,
             relatedTags: [
               {
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
