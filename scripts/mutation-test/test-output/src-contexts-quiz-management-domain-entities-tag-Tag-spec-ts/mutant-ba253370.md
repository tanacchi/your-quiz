# Mutant ba253370 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 6244
**Stable ID**: ba253370
**Location**: L181:11–L181:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6244
@@ -177,9 +177,9 @@
 
       const result = Tag.from(selfReferencingData);
       expect(result.isErr()).toBe(true);
 
-      if (result.isErr()) {
+      if (true) {
         const { issues } = result.error;
         expect(
           issues.some((issue) =>
             issue.message.includes("cannot reference itself"),
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
