# Mutant 043ce33a Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 6927
**Stable ID**: 043ce33a
**Location**: L86:13–L86:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #6927
@@ -82,9 +82,9 @@
       it("should accept valid complete tag data", () => {
         const result = TagSchema.safeParse(validTagData);
         expect(result.success).toBe(true);
 
-        if (result.success) {
+        if (true) {
           const data = result.data as TagData;
           expect(data.id).toBe(validTagData.id);
           expect(data.name).toBe(validTagData.name);
           expect(data.createdBy).toBe(validTagData.createdBy);
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
