# Mutant 8ee90762 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4684
**Stable ID**: 8ee90762
**Location**: L594:55–L609:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4684
@@ -590,25 +590,10 @@
       const result = suggestQuizSummaryPatches(validQuizSummaryInput, issues);
       expect(result).toEqual([]);
     });
 
-    it("should handle malformed input objects", () => {
-      const malformedInputs = [
-        { question: null, answerType: undefined, status: 123 },
-        { id: [], solutionId: {}, creatorId: true },
-      ];
+    it("should handle malformed input objects", () => {});
 
-      const issues: Issue[] = [
-        { path: ["question"], code: "invalid", message: "Invalid" },
-        { path: ["answerType"], code: "invalid", message: "Invalid" },
-      ];
-
-      malformedInputs.forEach((input) => {
-        const result = suggestQuizSummaryPatches(input, issues);
-        expect(Array.isArray(result)).toBe(true);
-      });
-    });
-
     it("should preserve original input when no patches are applicable", () => {
       const input = { ...validQuizSummaryInput };
       const issues: Issue[] = [
         { path: ["unknownField"], code: "invalid", message: "Invalid" },
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
