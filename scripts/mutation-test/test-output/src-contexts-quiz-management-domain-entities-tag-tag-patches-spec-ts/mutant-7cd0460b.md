# Mutant 7cd0460b Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6489
**Stable ID**: 7cd0460b
**Location**: L120:62–L120:71

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6489
@@ -116,9 +116,9 @@
       });
 
       it("should handle undefined input", () => {
         const issues: Issue[] = [
-          { path: ["relatedTags"], code: "invalid", message: "Invalid" },
+          { path: ["relatedTags"], code: "invalid", message: "" },
         ];
         const result = suggestTagPatches(undefined, issues);
         expect(result).toEqual([]);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
