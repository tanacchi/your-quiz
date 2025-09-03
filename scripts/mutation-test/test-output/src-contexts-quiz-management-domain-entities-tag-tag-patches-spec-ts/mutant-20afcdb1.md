# Mutant 20afcdb1 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6574
**Stable ID**: 20afcdb1
**Location**: L262:50–L265:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6574
@@ -258,12 +258,9 @@
     });
   });
 
   describe("Edge Cases and Error Handling", () => {
-    it("should handle empty issues array", () => {
-      const result = suggestTagPatches(validTagInput, []);
-      expect(result).toEqual([]);
-    });
+    it("should handle empty issues array", () => {});
 
     it("should handle issues with non-string paths", () => {
       const issues: Issue[] = [
         { path: [0], code: "invalid", message: "Invalid" },
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
