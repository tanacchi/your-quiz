# Mutant 416d12bc Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6616
**Stable ID**: 416d12bc
**Location**: L303:61–L303:70

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6616
@@ -299,9 +299,9 @@
 
     it("should preserve original input when no patches are applicable", () => {
       const input = { ...validTagInput };
       const issues: Issue[] = [
-        { path: ["unknownField"], code: "invalid", message: "Invalid" },
+        { path: ["unknownField"], code: "invalid", message: "" },
       ];
 
       const patches = suggestTagPatches(input, issues);
       const patched = applyEntityPatches<TagInput>(input, patches);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
