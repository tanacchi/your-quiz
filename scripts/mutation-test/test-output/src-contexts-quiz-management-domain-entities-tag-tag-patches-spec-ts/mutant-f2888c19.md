# Mutant f2888c19 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6562
**Stable ID**: f2888c19
**Location**: L230:24–L230:50

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6562
@@ -226,9 +226,9 @@
           const input = {
             id: "tag-typescript",
             name: "TypeScript Programming",
             createdBy: "user-expert",
-            createdAt: "2023-12-01T10:00:00.000Z",
+            createdAt: "",
             relatedTags: undefined,
             extraData: "should be preserved", // This would be removed by strict schema, but patch doesn't affect it
           };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
