# Mutant 70326f2e Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 6458
**Stable ID**: 70326f2e
**Location**: L92:49–L92:53

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6458
@@ -88,9 +88,9 @@
         const issues: Issue[] = [
           { path: ["relatedTags"], code: "invalid", message: "Invalid" },
         ];
 
-        const nonObjectInputs = ["string", 123, true];
+        const nonObjectInputs = ["string", 123, false];
 
         nonObjectInputs.forEach((input) => {
           const result = suggestTagPatches(input, issues);
           // Non-object inputs return empty since isObjectLike fails
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
