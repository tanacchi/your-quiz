# Mutant f76b5a27 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6608
**Stable ID**: f76b5a27
**Location**: L300:8–L300:71

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6608
@@ -296,9 +296,9 @@
         expect(result).toEqual([]);
       });
     });
 
-    it("should preserve original input when no patches are applicable", () => {
+    it("", () => {
       const input = { ...validTagInput };
       const issues: Issue[] = [
         { path: ["unknownField"], code: "invalid", message: "Invalid" },
       ];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
