# Mutant fef46728 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7033
**Stable ID**: fef46728
**Location**: L188:29–L190:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7033
@@ -184,11 +184,9 @@
         };
         const result = TagSchema.safeParse(dataWithMultipleRelatedTags);
         expect(result.success).toBe(true);
 
-        if (result.success) {
-          expect(result.data.relatedTags).toHaveLength(3);
-        }
+        if (result.success) {}
       });
 
       describe("Related Tag Object Validation", () => {
         it.each([
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
