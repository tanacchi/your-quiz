# Mutant f2266a5c Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2415
**Stable ID**: f2266a5c
**Location**: L717:50–L722:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2415
@@ -713,15 +713,10 @@
     });
   });
 
   describe("Edge Cases and Error Handling", () => {
-    it("should handle empty issues array", () => {
-      const result = suggestQuizPatches(validQuizInput, []);
+    it("should handle empty issues array", () => {});
 
-      // Should still include consistency patches
-      expect(Array.isArray(result)).toBe(true);
-    });
-
     it("should handle issues with non-string paths", () => {
       const issues: Issue[] = [
         { path: [0], code: "invalid", message: "Invalid" },
         { path: ["question", 1], code: "invalid", message: "Invalid" },
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
