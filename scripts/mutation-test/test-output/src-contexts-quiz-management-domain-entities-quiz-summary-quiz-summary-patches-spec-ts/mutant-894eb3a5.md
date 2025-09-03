# Mutant 894eb3a5 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4704
**Stable ID**: 894eb3a5
**Location**: L611:79–L621:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4704
@@ -607,19 +607,9 @@
         expect(Array.isArray(result)).toBe(true);
       });
     });
 
-    it("should preserve original input when no patches are applicable", () => {
-      const input = { ...validQuizSummaryInput };
-      const issues: Issue[] = [
-        { path: ["unknownField"], code: "invalid", message: "Invalid" },
-      ];
-
-      const patches = suggestQuizSummaryPatches(input, issues);
-      const patched = applyEntityPatches(input, patches);
-
-      expect(patched).toEqual(input);
-    });
+    it("should preserve original input when no patches are applicable", () => {});
   });
 
   describe("Performance and Large Data Handling", () => {
     it("should handle large number of issues efficiently", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
