# Mutant f0b77402 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 6611
**Stable ID**: f0b77402
**Location**: L302:31–L304:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6611
@@ -298,11 +298,9 @@
     });
 
     it("should preserve original input when no patches are applicable", () => {
       const input = { ...validTagInput };
-      const issues: Issue[] = [
-        { path: ["unknownField"], code: "invalid", message: "Invalid" },
-      ];
+      const issues: Issue[] = [];
 
       const patches = suggestTagPatches(input, issues);
       const patched = applyEntityPatches<TagInput>(input, patches);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
