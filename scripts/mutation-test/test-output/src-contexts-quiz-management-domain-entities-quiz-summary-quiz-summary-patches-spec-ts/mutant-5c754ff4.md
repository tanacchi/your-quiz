# Mutant 5c754ff4 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4681
**Stable ID**: 5c754ff4
**Location**: L587:60–L587:69

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4681
@@ -583,9 +583,9 @@
 
     it("should handle issues with non-string paths", () => {
       const issues: Issue[] = [
         { path: [0], code: "invalid", message: "Invalid" },
-        { path: ["question", 1], code: "invalid", message: "Invalid" },
+        { path: ["question", 1], code: "invalid", message: "" },
       ];
 
       const result = suggestQuizSummaryPatches(validQuizSummaryInput, issues);
       expect(result).toEqual([]);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
