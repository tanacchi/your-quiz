# Mutant bc5356b4 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 6309
**Stable ID**: bc5356b4
**Location**: L265:11–L265:31

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6309
@@ -261,9 +261,9 @@
 
       const entityResult = draft.commit();
       expect(entityResult.isErr()).toBe(true);
 
-      if (entityResult.isErr()) {
+      if (false) {
         const { issues } = entityResult.error;
         expect(issues.length).toBeGreaterThan(0);
         const nameError = issues.find((issue) => issue.path.includes("name"));
         expect(nameError).toBeDefined();
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
