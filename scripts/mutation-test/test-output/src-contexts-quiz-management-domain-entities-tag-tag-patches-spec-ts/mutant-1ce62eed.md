# Mutant 1ce62eed Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6457
**Stable ID**: 1ce62eed
**Location**: L92:34–L92:42

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6457
@@ -88,9 +88,9 @@
         const issues: Issue[] = [
           { path: ["relatedTags"], code: "invalid", message: "Invalid" },
         ];
 
-        const nonObjectInputs = ["string", 123, true];
+        const nonObjectInputs = ["", 123, true];
 
         nonObjectInputs.forEach((input) => {
           const result = suggestTagPatches(input, issues);
           // Non-object inputs return empty since isObjectLike fails
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
