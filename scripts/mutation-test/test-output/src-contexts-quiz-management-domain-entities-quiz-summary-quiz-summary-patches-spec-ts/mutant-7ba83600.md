# Mutant 7ba83600 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4670
**Stable ID**: 7ba83600
**Location**: L584:8–L584:52

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4670
@@ -580,9 +580,9 @@
       const result = suggestQuizSummaryPatches(validQuizSummaryInput, []);
       expect(result).toEqual([]);
     });
 
-    it("should handle issues with non-string paths", () => {
+    it("", () => {
       const issues: Issue[] = [
         { path: [0], code: "invalid", message: "Invalid" },
         { path: ["question", 1], code: "invalid", message: "Invalid" },
       ];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
