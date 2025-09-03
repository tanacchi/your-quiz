# Mutant e40f38a3 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4667
**Stable ID**: e40f38a3
**Location**: L579:50–L582:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4667
@@ -575,12 +575,9 @@
     });
   });
 
   describe("Edge Cases and Error Handling", () => {
-    it("should handle empty issues array", () => {
-      const result = suggestQuizSummaryPatches(validQuizSummaryInput, []);
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
