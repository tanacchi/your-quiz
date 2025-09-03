# Mutant a84f0e5d Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 6298
**Stable ID**: a84f0e5d
**Location**: L252:11–L252:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6298
@@ -248,9 +248,9 @@
 
       const entityResult = draft.commit();
       expect(entityResult.isOk()).toBe(true);
 
-      if (entityResult.isOk()) {
+      if (true) {
         const tag = entityResult.value;
         expect(tag.get("name")).toBe("TypeScript");
       }
     });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
