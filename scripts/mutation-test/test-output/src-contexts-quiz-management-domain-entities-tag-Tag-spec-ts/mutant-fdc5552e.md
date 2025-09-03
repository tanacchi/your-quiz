# Mutant fdc5552e Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 6245
**Stable ID**: fdc5552e
**Location**: L181:11–L181:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6245
@@ -177,9 +177,9 @@
 
       const result = Tag.from(selfReferencingData);
       expect(result.isErr()).toBe(true);
 
-      if (result.isErr()) {
+      if (false) {
         const { issues } = result.error;
         expect(
           issues.some((issue) =>
             issue.message.includes("cannot reference itself"),
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
