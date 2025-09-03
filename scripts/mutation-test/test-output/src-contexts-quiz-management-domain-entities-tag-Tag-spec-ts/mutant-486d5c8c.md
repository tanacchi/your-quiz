# Mutant 486d5c8c Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 6308
**Stable ID**: 486d5c8c
**Location**: L265:11–L265:31

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6308
@@ -261,9 +261,9 @@
 
       const entityResult = draft.commit();
       expect(entityResult.isErr()).toBe(true);
 
-      if (entityResult.isErr()) {
+      if (true) {
         const { issues } = entityResult.error;
         expect(issues.length).toBeGreaterThan(0);
         const nameError = issues.find((issue) => issue.path.includes("name"));
         expect(nameError).toBeDefined();
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
