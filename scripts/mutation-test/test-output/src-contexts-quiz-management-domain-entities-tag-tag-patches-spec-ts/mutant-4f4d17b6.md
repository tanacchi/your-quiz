# Mutant 4f4d17b6 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6480
**Stable ID**: 4f4d17b6
**Location**: L112:62–L112:71

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6480
@@ -108,9 +108,9 @@
       });
 
       it("should handle null input", () => {
         const issues: Issue[] = [
-          { path: ["relatedTags"], code: "invalid", message: "Invalid" },
+          { path: ["relatedTags"], code: "invalid", message: "" },
         ];
         const result = suggestTagPatches(null, issues);
         expect(result).toEqual([]);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
