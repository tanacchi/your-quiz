# Mutant af133fff Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 6230
**Stable ID**: af133fff
**Location**: L156:11–L156:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6230
@@ -152,9 +152,9 @@
 
       const result = Tag.from(invalidData);
       expect(result.isErr()).toBe(true);
 
-      if (result.isErr()) {
+      if (false) {
         const { issues } = result.error;
         expect(
           issues.some((issue) =>
             issue.message.includes("Duplicate related tag IDs"),
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
