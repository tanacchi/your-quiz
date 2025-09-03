# Mutant 2778c05f Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4671
**Stable ID**: 2778c05f
**Location**: L584:60–L592:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4671
@@ -580,18 +580,10 @@
       const result = suggestQuizSummaryPatches(validQuizSummaryInput, []);
       expect(result).toEqual([]);
     });
 
-    it("should handle issues with non-string paths", () => {
-      const issues: Issue[] = [
-        { path: [0], code: "invalid", message: "Invalid" },
-        { path: ["question", 1], code: "invalid", message: "Invalid" },
-      ];
+    it("should handle issues with non-string paths", () => {});
 
-      const result = suggestQuizSummaryPatches(validQuizSummaryInput, issues);
-      expect(result).toEqual([]);
-    });
-
     it("should handle malformed input objects", () => {
       const malformedInputs = [
         { question: null, answerType: undefined, status: 123 },
         { id: [], solutionId: {}, creatorId: true },
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
